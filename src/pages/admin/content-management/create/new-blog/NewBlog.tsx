
"use client";

import { useEffect, useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";

import { useNavigate, useParams } from "react-router-dom";
import BlogHeader from "./Header";
import {
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDropzone } from "react-dropzone";
import { Audio } from "./Audio";
import { Video } from "./video";
import { LinkModal } from "./LinkModal";
import { CoverImageUpload } from "./CoverImageUpload";
import { BlogContent } from "./BlogContent";
import { EditorToolbar } from "./EditorToolBar";
import { Skeleton } from "@/components/ui/skeleton";

export default function NewBlog() {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [urlId, setUrlId] = useState("");


 

  const [selectedTag, setSelectedTag] = useState<string>("");
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  
  const [isUploading, setIsUploading] = useState(false);


  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Audio,
      Strike,
      Video,
      Link.configure({ openOnClick: false }),
      Image,
      Heading.configure({ levels: [1, 2, 3, 4, 5] }),
      Placeholder.configure({
        placeholder: "Start creating blog",
      }),
    ],
    content: "",
  });

  const insertLink = () => {
    if (!linkText || !linkUrl) return;
    const linkHTML = `<a href="${linkUrl}" class="text-[red] underline hover:text-blue-800">${linkText}</a>`;
    editor?.chain().focus().insertContent(linkHTML).run();
    setShowLinkModal(false);
    setLinkText("");
    setLinkUrl("");
  };

  // const onDrop = async (acceptedFiles: File[]) => {
  //   if (!acceptedFiles || acceptedFiles.length === 0) return;

  //   setIsUploading(true);
  //   try {
  //     // const urls = await uploadToCloudinary(acceptedFiles);
  //     if (urls.length > 0) {
  //       const uploadedUrl = urls[0];
  //       setCoverImage(uploadedUrl);
  //       console.log(uploadedUrl);
  //       if (id) {
  //         console.log("🟢 Updating blog with new cover media...");
  //         await editBlog({
  //           variables: {
  //             id,
  //             data: {
  //               title: title || blogData?.getOneBlog?.title || "",
  //               content:
  //                 editor?.getHTML() || blogData?.getOneBlog?.content || "",
  //               coverMedia: uploadedUrl,
  //               status: blogData?.getOneBlog?.status || "DRAFT",
  //             },
  //           },
  //         });
  //       } else {
  //         console.log("🆕 Creating new blog with uploaded media...");
  //         const { data } = await createBlog({
  //           variables: {
  //             data: {
  //               title: title || "Untitled",
  //               content: editor?.getHTML() || "",
  //               coverMedia: uploadedUrl,
  //               tagId: selectedTag?.trim() ? selectedTag : "",
  //               status: "DRAFT",
  //             },
  //           },
  //         });

  //         const newBlog = data?.createBlog.blog;
  //         if (newBlog?.id) {
  //           navigate(`/new-blog/${newBlog.id}`, { replace: true });
  //         }
  //       }
  //     }
  //   } catch (err) {
  //     console.error("❌ Upload failed:", err);
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

  // const handleSaveBlog = async (status: BlogStatus) => {
  //   if (!title.trim()) return;

  //   const content = editor?.getHTML() || "";

  //   try {
  //     if (id) {
  //       const { data } = await editBlog({
  //         variables: {
  //           id,
  //           data: {
  //             title,
  //             content,
  //             coverMedia: coverImage
  //               ? coverImage
  //               : blogData?.getOneBlog.coverMedia || "",
  //             tagId: selectedTag?.trim() ? selectedTag : undefined,
  //             status,
  //           },
  //         },
  //       });

  //       console.log("✅ Blog updated:", data?.editBlog.blog);
  //       if (data) {
  //         setUrlId(data?.editBlog.blog.id);
  //       }
  //     } else {
  //       const { data } = await createBlog({
  //         variables: {
  //           data: {
  //             title,
  //             content,
  //             coverMedia: coverImage
  //               ? coverImage
  //               : blogData?.getOneBlog.coverMedia?.[0] || "",

  //             tagId: selectedTag?.trim() ? selectedTag : "",
  //             status,
  //           },
  //         },
  //       });

  //       const newBlog = data?.createBlog.blog;
  //       console.log("✅ Blog created:", newBlog);

  //       if (newBlog?.id) {
  //         navigate(`/new-blog/${newBlog.id}`, { replace: true });
  //       }
  //     }
  //   } catch (err) {
  //     console.error("❌ Error saving blog:", err);
  //   }
  // };

  const { getRootProps, getInputProps } = useDropzone({
    // onDrop,
    accept: {
      "image/*": [],
      "video/*": [],
      "audio/*": [],
    },
    maxSize: 20 * 1024 * 1024,
  });

  // const { data: blogData, loading: blogDataLoading } = useQuery<
  //   GetOneBlogResponse,
  //   GetOneBlogVariables
  // >(GET_ONE_BLOG, {
  //   variables: { id: id! },
  //   skip: !id,
  // });



  const [newTagName, setNewTagName] = useState("");
  const [showTagPopover, setShowTagPopover] = useState(false);

  // const handleCreateTag = async () => {
  //   if (!newTagName.trim()) return;
  //   try {
  //     await createBlogTag({
  //       variables: {
  //         data: { name: newTagName },
  //       },
  //     });
  //     setNewTagName("");
  //     setShowTagPopover(false);
  //   } catch (err) {
  //     console.error("❌ Error creating tag:", err);
  //   }
  // };

  const handleInsertMedia = async (type: "audio" | "video") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = type === "audio" ? "audio/*" : "video/*";

    // input.onchange = async (e: Event) => {
    //   const target = e.target as HTMLInputElement;
    //   const file = target.files?.[0];
    //   if (!file) return;

    //   setIsUploading(true);
    //   try {
    //     const urls = await uploadToCloudinary([file]);
    //     const mediaUrl = urls[0];

    //     if (!mediaUrl) throw new Error("Upload failed — no URL returned");

    //     editor
    //       ?.chain()
    //       .focus()
    //       .insertContent({
    //         type: type,
    //         attrs: {
    //           src: mediaUrl,
    //           type: file.type,
    //         },
    //       })
    //       .run();

    //     const content = editor?.getHTML() || "";
    //     if (id) {
    //       await editBlog({
    //         variables: {
    //           id,
    //           data: {
    //             title,
    //             content,
    //             coverMedia: coverImage
    //               ? coverImage
    //               : blogData?.getOneBlog.coverMedia || "",

    //             tagId: selectedTag?.trim() ? selectedTag : "",
    //             status: blogData?.getOneBlog?.status || "DRAFT",
    //           },
    //         },
    //       });
    //     } else {
    //       const { data } = await createBlog({
    //         variables: {
    //           data: {
    //             title: title || "Untitled",
    //             content,
    //             coverMedia: coverImage || "",
    //             tagId: selectedTag?.trim() ? selectedTag : "",
    //             status: "DRAFT",
    //           },
    //         },
    //       });

    //       const newBlog = data?.createBlog.blog;
    //       if (newBlog?.id) {
    //         setUrlId(newBlog.id);
    //         navigate(`/new-blog/${newBlog.id}`, { replace: true });
    //       }
    //     }
    //   } catch (err) {
    //     console.error("❌ Media upload failed:", err);
    //   } finally {
    //     setIsUploading(false);
    //   }
    // };

    input.click();
  };

  // const handleImageClick = () => {
  //   const input = document.createElement("input");
  //   input.type = "file";
  //   input.accept = "image/*";
  //   input.onchange = async (e: any) => {
  //     const file = e.target.files?.[0];
  //     if (!file) return;
  //     setIsUploading(true);
  //     try {
  //       const urls = await uploadToCloudinary([file]);
  //       const imageUrl = urls[0];
  //       editor?.chain().focus().setImage({ src: imageUrl }).run();
  //     } catch (err) {
  //       console.error("❌ Image upload failed:", err);
  //     } finally {
  //       setIsUploading(false);
  //     }
  //   };
  //   input.click();
  // };

  return (
    <div className="flex  flex-col justify-center">
     <div className="sticky top-0 z-50">
  

  <EditorToolbar
    editor={editor}
    onLinkClick={() => setShowLinkModal(true)}
    // onImageClick={handleImageClick}
    onAudioClick={() => handleInsertMedia("audio")}
    onVideoClick={() => handleInsertMedia("video")}
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
          trigger={<div />}
        />
      </Popover>
      <div className=" mx-auto mt-[30px]">
        
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value || "")}
            className="w-full text-4xl font-semibold text-gray-900 border-none focus:ring-0 outline-none placeholder-gray-400"
            placeholder="Untitled"
          />
      </div>
      <div className=" mx-auto mt-4">
     
      </div>
    
      <CoverImageUpload
        coverImage={""}
        isUploading={isUploading}
        // isLoading={blogDataLoading}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
      />
      <BlogContent
        editor={editor}
        title={title}
        onTitleChange={setTitle}
        // isLoading={blogDataLoading}
      />
    </div>
  );
}