import React, { useState } from "react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";

const SortBy = ({ setSortBy , sortBy}) => {
  const [open, setOpen] = useState(false);

  return (
<div className="relative">
  <Button
    variant="ghost"
    size="sm"
    className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
    onClick={() => setOpen(!open)}
  >
    <span>Sort by</span>
    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
  </Button>

  {open && (
    <div className="absolute right-0 mt-1.5 z-50 w-48 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95">
      <Command className="border-none">
        <CommandList>
          <CommandGroup className="p-1.5">
            <CommandItem
              className="flex items-center px-3 py-2 text-sm rounded-lg cursor-pointer transition-all duration-150 hover:bg-gray-50 dark:hover:bg-gray-700/70 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-700"
              onSelect={() => {
                setSortBy("price");
                setOpen(false);
              }}
            >
              <span className="flex-1">Price</span>
              {sortBy === "price" && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </CommandItem>
            <CommandItem
              className="flex items-center px-3 py-2 text-sm rounded-lg cursor-pointer transition-all duration-150 hover:bg-gray-50 dark:hover:bg-gray-700/70 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-700"
              onSelect={() => {
                setSortBy("date");
                setOpen(false);
              }}
            >
              <span className="flex-1">Date</span>
              {sortBy === "date" && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )}
</div>
  );
};

export default SortBy;
