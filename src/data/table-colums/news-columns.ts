"use client"

import { getStatus } from "@/lib/utils/GetStatus"
import type { statusType } from "@/types/status"
import type { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  id: string
  amount: number
  status: statusType
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },,
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      getStatus({
        status: row.original.status,
      }),
  },
]