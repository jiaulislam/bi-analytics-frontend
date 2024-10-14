"use client";

import * as React from "react";
import {
  ColumnDef,
  VisibilityState,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

interface DataTableProps<TData, TValue> {
  title: string;
  subtitle: string;
  columns: ColumnDef<TData, TValue>[];
  className?: string;
  url?: string;
}

export function DataTableCardInvestorWiseSaleableStock<TData, TValue>({
  title,
  subtitle,
  columns,
  className,
  url,
}: DataTableProps<TData, TValue>) {
  const { data: session } = useSession();
  const [data, setData] = React.useState<TData[]>([]);
  const [totalRows, setTotalRows] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [companyName, setCompanyName] = React.useState<string>("");
  const [investorName, setInvestorName] = React.useState<string>("");

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { pageIndex, pageSize } = pagination;
      const query = new URLSearchParams({
        page: (pageIndex + 1).toString(),
        page_size: pageSize.toString(),
      });

      if (companyName) query.append("company", companyName);
      if (investorName) query.append("investor", investorName);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_V1_APIURL}${url}?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      setData(result.data.results);
      setTotalRows(result.data.count);
      setLoading(false);
    };

    fetchData();
  }, [pagination, sorting, companyName, investorName]);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    manualPagination: true,
    pageCount: Math.ceil(totalRows / pagination.pageSize),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Card className={cn("w-full shadow-md", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <DataTableToolbar
            table={table}
            onCompanySearch={(value) => setCompanyName(value)}
            onInvestorSearch={(value) => setInvestorName(value)}
          />
          <div className="rounded-md border overflow-hidden">
            <div className="max-h-[800px] overflow-y-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="text-center"
                      >
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="text-center"
                      >
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          <DataTablePagination table={table} />
        </div>
      </CardContent>
    </Card>
  );
}
