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
  onInvestorSearch: (value: string) => void; // New prop for investor filter
}

export function DataTableToolbar<TData>({
  table,
  onCompanySearch,
  onInvestorSearch,
}: DataTableToolbarProps<TData>) {
  const [companyInput, setCompanyInput] = React.useState("");
  const [investorInput, setInvestorInput] = React.useState("");

  const handleCompanySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCompanyInput(value);
    onCompanySearch(value);
  };

  const handleInvestorSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInvestorInput(value);
    onInvestorSearch(value);
  };

  return (
    <div className="flex items-center justify-between space-y-2 lg:space-y-0 lg:space-x-4 flex-wrap">
      <div className="flex items-center space-x-2">
        {/* Company Filter */}
        <Input
          placeholder="Filter Company Name..."
          value={companyInput}
          onChange={handleCompanySearch}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {companyInput && (
          <Button
            variant="ghost"
            onClick={() => {
              setCompanyInput("");
              onCompanySearch("");
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}

        {/* Investor Filter */}
        <Input
          placeholder="Filter Investor..."
          value={investorInput}
          onChange={handleInvestorSearch}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {investorInput && (
          <Button
            variant="ghost"
            onClick={() => {
              setInvestorInput("");
              onInvestorSearch("");
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
