

import { truncateText } from "@/lib/utils/truncateText";
import type { ColumnDef } from "@tanstack/react-table";

export type Data = {
  id: string;
  title: string;
  fullName: string;
  email: string;
  message: string;
  image: string;
  position?:string
  phone?:string
};

export const userColumns: ColumnDef<Data>[] = [
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
];

export const involvedColumn: ColumnDef<Data>[] = [
 
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
    accessorKey: "phone",
    header: "Phone number",
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => truncateText(row.original.position, 20),
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => truncateText(row.original.message, 20),
  },
  
];

export const contactColumn: ColumnDef<Data>[] = [
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ getValue }) => (
      <span className="text-[#1F2937] pl-2">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => truncateText(row.original.email, 12),
  },
  {
    accessorKey: "phone",
    header: "Phone number",
  },
  

  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => truncateText(row.original.message, 20),
  },
];



