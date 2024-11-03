"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
  order_id: number;
  order_date: string;
  start_time: string;
  start_point: number;
  end_point: number;
  load_name: string;
  load_amount: number;
  load_weight: number;
};

export const columns = (
  handleDeleteOrder: (orderId: number) => void,
): ColumnDef<Order>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "order_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
    cell: ({ row }) => {
      const order_id = parseFloat(row.getValue("order_id"));
      return <div className="font-medium">{order_id}</div>;
    },
  },
  {
    accessorKey: "order_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Date" />
    ),
  },
  {
    accessorKey: "start_time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Time" />
    ),
  },
  {
    accessorKey: "start_point",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Point" />
    ),
  },
  {
    accessorKey: "end_point",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Point" />
    ),
  },
  {
    accessorKey: "load_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Load Name" />
    ),
  },
  {
    accessorKey: "load_amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Load Amount" />
    ),
    cell: ({ row }) => {
      const load_amount = row.getValue("load_amount");
      return <div>{`${load_amount} units`}</div>;
    },
  },
  {
    accessorKey: "load_weight",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Load Weight" />
    ),
    cell: ({ row }) => {
      const load_weight = row.getValue("load_weight");
      return <div>{`${load_weight} kg`}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(order.order_date.toString())
              }
            >
              Copy order_date
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDeleteOrder(order.order_id)}>
              Delete order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
