"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Payment = {
    id: string
    active: boolean
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export const columns: ColumnDef<Payment>[] = [
    // ✅ Checkbox
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) =>
                    row.toggleSelected(!!value)
                }
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    // ✅ Status
    {
        accessorKey: "status",
        header: "Status",
    },

    // ✅ Email com ordenação
    {
        accessorKey: "email",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                E-mail
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },

    // ✅ Active
    {
        accessorKey: "active",
        header: "Ativo",
        cell: ({ row }) =>
            row.getValue("active") ? "Sim" : "Não",
    },

    // ✅ AÇÕES (3 pontinhos)
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => {
                                console.log("Editar:", payment.id)
                            }}
                        >
                            Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() => {
                                console.log("Excluir:", payment.id)
                            }}
                            className="text-red-600"
                        >
                            Excluir
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
