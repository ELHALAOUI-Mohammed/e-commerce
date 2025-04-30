import React, { useState } from "react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const SortBy = ({ setSortBy }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => setOpen(!open)}
      >
        Sort by
        <ChevronDown className="h-4 w-4" />
      </Button>

      {open && (
        <div className="absolute mt-2 z-10 w-40 rounded-md bg-white shadow-lg border">
          <Command>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setSortBy("price");
                    setOpen(false);
                  }}
                >
                  Price
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setSortBy("date");
                    setOpen(false);
                  }}
                >
                  Date
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
