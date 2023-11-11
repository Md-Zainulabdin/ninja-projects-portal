import { create } from "zustand";

interface useFilterInterface {
  filter: string;
  setFilterValue: (val: string) => void;
  removeFilterValue: (val: string) => void;
}

export const useFilter = create<useFilterInterface>((set) => ({
  filter: "ALL",
  setFilterValue: (val) => set({ filter: val }),
  removeFilterValue: (val) => set({ filter: "ALL" }),
}));
