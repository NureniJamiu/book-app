import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  //   setUser: (user) => set({ user }),
  //   setToken: (token) => set({ token }),
  register: async (username, email, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to register user");
      }

      // save user and token in Async storage
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ user: data.user, token: data.token, isLoading: false });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      console.error(error);

      return { success: false, error: error.message };
    }
  },

  clearAuth: () => set({ user: null, token: null }),
  isAuthenticated: () => !!get().user && !!get().token,
}));
