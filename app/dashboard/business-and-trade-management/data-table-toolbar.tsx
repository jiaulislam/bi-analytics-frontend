"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import React from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onCompanySearch: (value: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  onCompanySearch,
}: DataTableToolbarProps<TData>) {
  const [searchInput, setSearchInput] = React.useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
    onCompanySearch(value);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter Company Name..."
          value={searchInput}
          onChange={handleSearch}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {searchInput && (
          <Button
            variant="ghost"
            onClick={() => {
              setSearchInput("");
              onCompanySearch("");
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
