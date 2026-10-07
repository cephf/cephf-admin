"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Strike from "@tiptap/extension-strike";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";

import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useDropzone } from "react-dropzone";
import { Audio } from "./Audio";
import { Video } from "./video";
import { YoutubeEmbed, getYoutubeEmbedUrl } from "./YoutubeEmbed";
import { LinkModal } from "./LinkModal";
import { CoverImageUpload } from "./CoverImageUpload";
import { BlogContent } from "./BlogContent";
import { EditorToolbar } from "./EditorToolBar";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiPost, apiUpdate } from "@/api/mutation";
import { apiGet } from "@/api/query";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { Loader2, X } from "lucide-react";
import { statusBadge } from "@/lib/utils/statusBadge";
import { toast } from "sonner";
import BlogSkeleton from "./BlogSkeleton";

type BlogStatus = "draft" | "published";

export default function NewBlog() {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);

  // raw comma-separated text the user types, e.g. "tech, news, ai"
  const [tagInput, setTagInput] = useState("");

  const navigate = useNavigate();
  const { id: routeId } = useParams<{ id?: string }>();
  const { tab } = useParams<{ tab: string }>();

  // internal id, seeded from the URL. Updated after the first successful
  // create so later saves update the same post instead of creating a new one.
  const [blogId, setBlogId] = useState<string | undefined>(routeId);

  const [isUploading, setIsUploading] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const queryClient = useQueryClient();

  const { data: postData, isLoading: isLoadingPost } = useQuery({
    queryKey: ["blog", routeId],
    queryFn: () => apiGet(`/posts/${routeId}`),
    enabled: !!routeId, // only fetch when editing an existing post
  });

  // makes sure the server data only overwrites local state ONCE, on
  // initial load — not every time a background refetch happens
  const hasPrefilled = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5] },
      }),
      Underline,
      Audio,
      Strike,
      Video,
      YoutubeEmbed,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({
        placeholder: "Start creating blog",
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose-editor",
      },
    },
    content: "",
  });

  useEffect(() => {
    if (!postData?.data || !editor) return;
    if (hasPrefilled.current) return;

    setTitle(postData.data.title || "");
    setCoverImage(postData.data.coverImage || null);
    setStatus(postData.data.status || "");
    editor.commands.setContent(postData.data.content || "");

    // tags come back as an array — join into the comma-separated
    // string the input field displays
    if (Array.isArray(postData.data.tags)) {
      setTagInput(postData.data.tags.join(", "));
    }

    hasPrefilled.current = true;
  }, [postData, editor]);

  function createBlogRequest(payload: Record<string, any>) {
    return apiPost("/posts", payload);
  }
  function updateBlogRequest(payload: Record<string, any>) {
    return apiUpdate(`/posts/${blogId}`, payload);
  }

  // Base onSuccess always runs: saves the id locally, never navigates.
  // Manual Save/Publish passes an extra onSuccess (at the call site)
  // that also navigates.
  const { mutate: createBlog, isPending: isCreating } = useMutation({
    mutationFn: createBlogRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      setLastSaved(new Date());
      if (data?.data?.id) {
        setBlogId(data.data.id);
      }
    },
    onError: () => {
      toast.error("Failed to create post", { position: "bottom-right" });
    },
  });

  const { mutate: editBlog, isPending: isUpdating } = useMutation({
    mutationFn: updateBlogRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      setLastSaved(new Date());
    },
    onError: () => {
      toast.error("Failed to update post", { position: "bottom-right" });
    },
  });

  const isSaving = isCreating || isUpdating;

  const insertLink = () => {
    if (!linkText || !linkUrl) return;
    const linkHTML = `<a href="${linkUrl}" class="text-[blue] underline hover:text-blue-800">${linkText}</a> `;
    editor?.chain().focus().insertContent(linkHTML).run();
    setShowLinkModal(false);
    setLinkText("");
    setLinkUrl("");
  };

  const insertYoutube = () => {
    const embedUrl = getYoutubeEmbedUrl(youtubeUrl);
    if (!embedUrl) return;
    editor?.chain().focus().insertContent({ type: "youtubeEmbed", attrs: { src: embedUrl } }).run();
    setShowYoutubeModal(false);
    setYoutubeUrl("");
  };

  // turns "tech, news,  ai" into ["tech", "news", "ai"] — trims
  // whitespace and drops empty entries from trailing/double commas
  const parseTags = (raw: string): string[] =>
    raw
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

  // single source of truth for every save so no field ever gets
  // silently dropped
  const buildPayload = (nextStatus: BlogStatus) => {
    const content = editor?.getHTML() || "";
    return {
      title: title || "Untitled",
      content,
      coverImage: coverImage || "",
      tags: parseTags(tagInput),
      status: nextStatus || "draft",
      author: "odi pearl",
      type: tab,
    };
  };

  const handleSaveBlog = (nextStatus: BlogStatus) => {
    if (!title.trim()) {
      toast.error("Add a title first", { position: "bottom-right" });
      return;
    }
    if (routeId && isLoadingPost) return;

    const payload = buildPayload(nextStatus);

    if (blogId) {
      editBlog(payload, {
        onSuccess: () => {
          setStatus(nextStatus);
          toast.success(nextStatus === "published" ? "Post published" : "Draft saved", {
            position: "bottom-right",
          });
        },
      });
    } else {
      createBlog(payload, {
        onSuccess: (data: any) => {
          setStatus(nextStatus);
          toast.success(nextStatus === "published" ? "Post published" : "Draft saved", {
            position: "bottom-right",
          });
          if (data?.data?.id) {
            navigate(
              `/content-management/edit-content/${tab}/${data.data.id}`,
              { replace: true }
            );
          }
        },
      });
    }
  };

  const onDrop = async (acceptedFiles: File[]) => {
    if (!acceptedFiles?.length) return;

    setIsUploading(true);
    try {
      const uploadedUrl = await uploadToCloudinary(acceptedFiles[0]);
      setCoverImage(uploadedUrl);
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Cover upload failed", { position: "bottom-right" });
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": [],
      "audio/*": [],
    },
    maxSize: 20 * 1024 * 1024,
  });

  const handleInsertMedia = (type: "audio" | "video") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = type === "audio" ? "audio/*" : "video/*";

    input.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      try {
        const mediaUrl = await uploadToCloudinary(file);
        if (!mediaUrl) throw new Error("Upload failed — no URL returned");

        editor
          ?.chain()
          .focus()
          .insertContent({
            type,
            attrs: {
              src: mediaUrl,
              type: file.type,
            },
          })
          .run();
      } catch (err) {
        console.error("Media upload failed:", err);
      } finally {
        setIsUploading(false);
      }
    };

    input.click();
  };

  const handleImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;
      setIsUploading(true);
      try {
        const imageUrl = await uploadToCloudinary(file);
        editor?.chain().focus().setImage({ src: imageUrl }).run();
      } catch (err) {
        console.error("Image upload failed:", err);
      } finally {
        setIsUploading(false);
      }
    };
    input.click();
  };
  if (routeId && isLoadingPost) {
    return (
      <BlogSkeleton/>
    );
  }
  return (
    <div className="flex flex-col justify-center">
      <div className="sticky top-0 z-50">
        <div className="flex justify-between py-4 gap-2 bg-[#F1F1F1]">
          <div className="flex items-center gap-2">
            <RouterLink to={`/content-management?tab=${tab}`} className="bg-white rounded-full p-2">
              <X size={14} />
            </RouterLink>
            {status && <p>{statusBadge(status)}</p>}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <button
                className="text-[black] rounded-full disabled:opacity-50"
                disabled={isSaving || isUploading || !title.trim()}
                onClick={() => handleSaveBlog("draft")}
              >
                Save as draft
              </button>
              <button
                className="py-2 px-8.5 text-[#FFFFFF] bg-[#186D0F] rounded-full disabled:opacity-50"
                disabled={isSaving || isUploading || !title.trim()}
                onClick={() => handleSaveBlog("published")}
              >
                {isSaving ? <Loader2 className="animate-spin" /> : "Publish"}
              </button>
            </div>
          </div>
        </div>
        <EditorToolbar
          editor={editor}
          onLinkClick={() => setShowLinkModal(true)}
          onImageClick={handleImageClick}
          onAudioClick={() => handleInsertMedia("audio")}
          onVideoClick={() => handleInsertMedia("video")}
          onYoutubeClick={() => setShowYoutubeModal(true)}
        />
      </div>

      <Popover open={showLinkModal} onOpenChange={setShowLinkModal}>
        <PopoverTrigger asChild>
          <Button className="hidden" />
        </PopoverTrigger>
        <LinkModal
          isOpen={showLinkModal}
          onClose={setShowLinkModal}
          linkText={linkText}
          linkUrl={linkUrl}
          onLinkTextChange={setLinkText}
          onLinkUrlChange={setLinkUrl}
          onInsert={insertLink}
          // trigger={<div />}
        />
      </Popover>

      {showYoutubeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 w-full max-w-md flex flex-col gap-4 shadow-xl">
            <p className="font-semibold text-base">Embed YouTube Video</p>
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="Paste YouTube URL (e.g. https://youtu.be/abc123)"
              className="border rounded-lg px-3 py-2 text-sm w-full outline-none focus:ring-2 focus:ring-[#186D0F]"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => { setShowYoutubeModal(false); setYoutubeUrl(""); }}
                className="px-4 py-2 text-sm rounded-lg border"
              >
                Cancel
              </button>
              <button
                onClick={insertYoutube}
                className="px-4 py-2 text-sm rounded-lg bg-[#186D0F] text-white"
              >
                Embed
              </button>
            </div>
          </div>
        </div>
      )}

      <div className=" mt-[30px]">
      <textarea
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  rows={2}
  className="w-full resize-none overflow-hidden text-4xl font-semibold text-gray-900 border-none focus:ring-0 outline-none placeholder-gray-400"
  placeholder="Untitled"
/>
      </div>

      <div className="mx-auto mt-2 w-full ">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          className="w-full text-sm text-gray-600 border-none focus:ring-0 outline-none placeholder-gray-400"
          placeholder="Tags (comma separated, e.g. tech, news, ai)"
        />
      </div>

      <CoverImageUpload
        coverImage={coverImage || ""}
        isUploading={isUploading}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
      />

      <BlogContent editor={editor} title={title} onTitleChange={setTitle} />

      <div className="flex items-center justify-between mt-6">
        <span className="text-xs text-gray-400">
          {isSaving
            ? "Saving..."
            : lastSaved
            ? `Saved ${lastSaved.toLocaleTimeString()}`
            : ""}
        </span>
      </div>
    </div>
  );
}