import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { History } from "@/utils/history";

type HistoryStore = {
  history: History[];
  addHistory: (history: History) => void;
  removeHistory: (history: History) => void;
  clearHistory: () => void;
};

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set) => ({
      history: [],
      addHistory: (history) => {
        set((state) => ({
          history: [...state.history, history],
        }));
      },
      removeHistory: (history) => {
        set((state) => ({
          history: state.history.filter((h) => h.id !== history.id),
        }));
      },
      clearHistory: () => {
        set({ history: [] });
      },
    }),
    {
      name: "history",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
