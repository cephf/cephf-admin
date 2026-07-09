
import { truncateText } from "@/lib/utils/truncateText";
import NewsActions from "@/pages/admin/content-management/news/Actions";
import type { ColumnDef } from "@tanstack/react-table";

export type Data = {
  id: string;
  title: string;
  fullName: string;
  email: string;
  message: string;
  image: string;
};

export const BlogColumn: ColumnDef<Data>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ getValue }) => (
      <span className="text-[#1F2937] pl-2">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => truncateText(row.original.email, 12),
  },

  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => truncateText(row.original.message, 20),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div onClick={(e) => e.stopPropagation()}>
        <NewsActions newsId={row.original.id} />
      </div>
    ),
  },
];
