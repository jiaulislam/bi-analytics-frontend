"use client";

import { cn, numberToMillionsString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import {
  CompanyWiseTotalSelableStock,
  SelableStockPercentage,
  InvestorWiseTotalSelableStock,
} from "@/types/businessTradManagement";

export type MarginLoanAllocationDataType = {
  name: string;
  amount: number;
};

export type ExposureControllingDataType = {
  exposure: string;
  investors: number;
  loanAmount: number;
};

const cellNumberFormatter = (row: any, accessorKey: string) => {
  const amount = parseFloat(row.getValue(accessorKey));
  return (
    <div
      className={cn("text-center font-medium ", {
        "text-red-600": amount < 0,
      })}
    >
      {numberToMillionsString(amount)}
    </div>
  );
};

export const companyWiseSalableStock: ColumnDef<CompanyWiseTotalSelableStock>[] =
  [
    {
      accessorKey: "companyName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Company Name" />
      ),
    },
    {
      accessorKey: "stockAvailable",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Salable Qty" />
      ),
      cell: ({ row }) => {
        return cellNumberFormatter(row, "stockAvailable");
      },
    },
  ];

export const SalableStockPercentage: ColumnDef<SelableStockPercentage>[] = [
  {
    accessorKey: "companyName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company Name" />
    ),
  },
  {
    accessorKey: "branchName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch Name" />
    ),
  },
  {
    accessorKey: "stockAvailablePercentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock(%)" />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "stockAvailablePercentage");
    },
  },
  {
    accessorKey: "stockAvailable",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Salable Qty" />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "stockAvailable");
    },
  },
];

export const InvestorWiseSalableStock: ColumnDef<InvestorWiseTotalSelableStock>[] =
  [
    {
      accessorKey: "companyName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Company Name" />
      ),
    },
    {
      accessorKey: "branchName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Branch Name" />
      ),
    },
    {
      accessorKey: "investorCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Investor Code" />
      ),
    },
    {
      accessorKey: "clientName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Client Name" />
      ),
    },
    {
      accessorKey: "rmName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="RM Name" />
      ),
    },
    {
      accessorKey: "stockAvailable",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Salable Qty" />
      ),
      cell: ({ row }) => {
        return cellNumberFormatter(row, "stockAvailable");
      },
    },
  ];
