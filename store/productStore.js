import { create } from "zustand";
import API_URL from "../src/api";

export const useProductStore = create((set) => ({
  clients: [],
  setClients: (clients) => set({ clients }),
  fetchClients: async () => {
    const res = await fetch(`${API_URL}/api/clients`);
    const data = await res.json();
    set({ clients: data.data });
  },
}));
