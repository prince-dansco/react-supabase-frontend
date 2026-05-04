import { create } from "zustand";
import { persist } from "zustand/middleware";
import Api from "../lip/axios";

export const useStores = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      users: [],
      isAuthenticated: false,
      isCheckingAuth: true,
      error: null,
      message: null,
      isLoading: false,
      
      // Actions
      clearError: () => set({ error: null }),
      clearMessage: () => set({ message: null }),
      
      // Register user
      creatUser: async (name, email, password) => {
        set({ isLoading: true, error: null });
        console.log(get)
        try {
          const response = await Api.post(`/register`, {
            name,
            email,
            password,
          });
          set({
            user: response.data,
            isLoading: false,
            isAuthenticated: true,
            message: "Account created successfully",
          });
          return response.data;
        } catch (error) {
          const errorMsg = error.response?.data?.message || "Error creating user";
          set({
            error: errorMsg,
            isLoading: false,
          });
          throw new Error(errorMsg);
        }
      },

      // Login user
      loginUser: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await Api.post(`/login`, {
            email,
            password,
          });
          set({
            user: response.data,
            isLoading: false,
            isAuthenticated: true,
            message: "Login successful",
          });
          return response.data;
        } catch (error) {
          const errorMsg = error.response?.data?.message || "Error logging in";
          set({
            error: errorMsg,
            isLoading: false,
          });
          throw new Error(errorMsg);
        }
      },

      // Get all users
      getAllUsers: async () => {
        set({ isLoading: true });
        try {
          const response = await Api.get(`/seeall`);
          set({
            users: response.data.users || [],
            isLoading: false,
          });
          return response.data;
        } catch (error) {
          const errorMsg = error.response?.data?.message || "Error fetching users";
          set({
            error: errorMsg,
            isLoading: false,
          });
          throw new Error(errorMsg);
        }
      },

        setGoogleAuth: (token, user) => {
        set({
          user: user,
          isAuthenticated: true,
          message: "Google login successful",
        });
      },


      // Logout
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          message: "Logged out successfully",
        });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);