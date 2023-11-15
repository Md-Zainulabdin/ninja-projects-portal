"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useFilter } from "@/hooks/ProjectFilter";

const techStacks = [
  {
    value: "all",
    label: "ALL",
  },
  {
    value: "nextjs",
    label: "Next JS",
  },
  {
    value: "reactjs",
    label: "React JS",
  },
  {
    value: "angular",
    label: "Angular",
  },
  {
    value: "vue",
    label: "Vue",
  },
  {
    value: "javascript",
    label: "JavaScript",
  },
];

const FilterOptions = () => {
  const filters = useFilter();

  // console.log(filters.filter);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role="combobox"
          aria-expanded={open}
          className="w-[120px] md:w-[200px] justify-between"
        >
          {value
            ? techStacks.find((tech) => tech.value === value)?.label
            : "Select techStack..."}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search techStack..." />
          <CommandEmpty>No techStack found.</CommandEmpty>

          <CommandGroup>
            {techStacks.map((tech) => (
              <CommandItem
                key={tech.value}
                value={tech.value}
                onSelect={(currentValue) => {
                  //   console.log(currentValue);
                  setValue(currentValue === value ? "" : currentValue);
                  filters.setFilterValue(tech.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === tech.value ? "opacity-100" : "opacity-0"
                  )}
                />

                {tech.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FilterOptions;
