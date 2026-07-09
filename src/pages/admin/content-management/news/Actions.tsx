"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmationModal from "@/components/shared/modals/ActionsModal";


interface BlogActionsProps {
  newsId: string;
}

const BlogActions = ({ newsId }: BlogActionsProps) => {
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            onClick={(e) => e.stopPropagation()}
            className="rounded-full p-2 hover:bg-[#F5F5F5]"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenuItem>
            Save as Draft
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setArchiveOpen(true)}>
            Archive
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-600"
            onClick={() => setDeleteOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationModal
        open={archiveOpen}
        onOpenChange={setArchiveOpen}
        title="Archive Blog?"
        description="Archiving will hide this blog from your website. Are you sure you want to archive this blog?"
        confirmText="Archive"
        confirmButtonClassName="purple-button"
        onConfirm={() => {
          console.log(newsId);
          setArchiveOpen(false);
        }}
      />

      <ConfirmationModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Blog?"
        description="Are you sure you want to delete this blog? This action cannot be undone."
        confirmText="Delete"
        confirmButtonClassName="red-button"
        onConfirm={() => {
          console.log(newsId);
          setDeleteOpen(false);
        }}
      />
    </>
  );
};

export default BlogActions;