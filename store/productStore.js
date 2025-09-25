import { create } from "zustand";
import API_URL from "../src/api";
import { data } from "react-router-dom";

export const useProductStore = create((set) => ({
  clients: [],
  groupedClients: [],
  client: null,
  loading: false,
  error: null,
  setClients: (clients) => set({ clients }),

  fetchClients: async (filterOptions = {}) => {
    const query = new URLSearchParams();
    Object.entries(filterOptions).forEach(([key, value]) => {
      if (value) query.append(key, value);
    });
    const res = await fetch(`${API_URL}/api/clients?${query.toString()}`);
    const data = await res.json();
    set({ clients: data.data });
  },
  fetchClientsByDate: async () => {
    try {
      const res = await fetch(`${API_URL}/api/clients/grouped`);
      const data = await res.json();
      set({ groupedClients: data.data });
      console.log(data.message);
      console.log(data.data);
    } catch (error) {
      console.log(data.message);
    }
  },
  fetchClient: async (id) => {
    set({ loading: true, error: null });

    const res = await fetch(`${API_URL}/api/clients/${id}`);
    const data = await res.json();
    set({ client: data.data, loading: false });
  },

  confirmClient: async (id, selectedClient) => {
    try {
      if (!selectedClient?.returnDate) {
        return {
          success: false,
          message: "Please set return date for this client",
        };
      }

      // console.log("Sending PUT request to:", `${API_URL}/api/clients/${id}`);
      // console.log("Payload:", selectedClient);

      const res = await fetch(`${API_URL}/api/clients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedClient),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server responded with error:", res.status, text);
        return { success: false, message: `HTTP error: ${res.status}` };
      }

      const data = await res.json();
      // console.log("Server response:", data);

      if (!data.success) {
        return { success: false, message: "ERROR" };
      }

      set((state) => ({
        clients: state.clients.map((client) =>
          client._id === id ? data.data : client
        ),
      }));

      return { success: true, message: "Client confirmed" };
    } catch (err) {
      console.error("confirmClient threw error:", err);
      return { success: false, message: "Unexpected error" };
    }
  },

  products: [],
  setProducts: (products) => set({ products }),
  setProductReservation: async (id, selectedProduct) => {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedProduct),
    });
    const data = await res.json();
    return { success: true, message: data.message };
  },
  fetchProducts: async () => {
    const res = await fetch(`${API_URL}/api/products`);

    const data = await res.json();
    // console.log(data);
    set({ products: data.products });
  },
  addProduct: async (newProduct) => {
    const res = await fetch(`${API_URL}/api/products/add-product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((products) => ({ products: [...state.products, data.data] }));
    return { success: data.success, message: data.message };
  },
}));
