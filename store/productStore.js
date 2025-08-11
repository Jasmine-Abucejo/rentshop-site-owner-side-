import { create } from "zustand";
import API_URL from "../src/api";

export const useProductStore = create((set) => ({
  clients: [],
  client: null,
  loading: false,
  error: null,
  setClients: (clients) => set({ clients }),

  fetchClients: async () => {
    const res = await fetch(`${API_URL}/api/clients`);
    const data = await res.json();
    set({ clients: data.data });
  },
  fetchClient: async (id) => {
    set({ loading: true, error: null });

    const res = await fetch(`${API_URL}/api/clients/${id}`);
    const data = await res.json();
    set({ client: data.data, loading: false });
  },
}));
