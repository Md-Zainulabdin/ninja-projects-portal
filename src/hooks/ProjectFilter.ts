import { create } from "zustand";

export const useFilter = create((set) => ({
  filter: "ALL",
  setFilterValue: (val: string) => set({ filter: val }),
}));
