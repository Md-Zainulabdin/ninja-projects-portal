import { create } from "zustand";

interface useProjectIDInterface {
  id: string;
  setProjectId: (val: string) => void;
  removeProjectId: () => void;
}

export const useProjectID = create<useProjectIDInterface>((set) => ({
  id: "",
  setProjectId: (val) => set({ id: val }),
  removeProjectId: () => set({ id: "" }),
}));
