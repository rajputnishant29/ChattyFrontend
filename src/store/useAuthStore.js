import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from "socket.io-client"

const BASE_URL = import.meta.env.VITE_SOCKET_URL;

export const useAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async()=> {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data})
            get().conectSocket();
        } catch (error) {
            console.log("Error in check auth:  ", error)
            set({ authUser:null})
        } finally{
            set({isCheckingAuth: false})
        }
    },
    signup: async(data) => {
    set({ isSigningUp: true });
    try {
        const res = await axiosInstance.post("/auth/signup", data);
        set({ authUser: res.data }); // ✅ Set the authUser first
        toast.success("Account created successfully");
        get().connectSocket(); // ✅ Then connect the socket
    } catch (error) {
        toast.error(error.response?.data?.message || "Signup failed");
    } finally {
        set({ isSigningUp: false });
    }
},

login: async (data) => {
    set({ isLoggingIn: true });
    try {
        const res = await axiosInstance.post("/auth/login", data);
        set({ authUser: res.data }); // Set auth user
        toast.success("Logged in Successfully");
        get().connectSocket(); // Then connect socket
    } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
    } finally {
        set({ isLoggingIn: false });
    }
},


logout: async () => {
    try {
        await axiosInstance.post("/auth/logout");
        set({ authUser: null });
        toast.success("Logged out successfully");
        get().disconnectSocket();
    } catch (error) {
        toast.error(error.response?.data?.message || "Logout failed");
    }
},

updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
        const res = await axiosInstance.put("/auth/update-profile", data);
        set({ authUser: res.data });
        toast.success("Profile updated successfully");
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
        set({ isUpdatingProfile: false });
    }
},
    connectSocket: () => {
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,            }
        })
        socket.connect()
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds})
        })
        set({ socket: socket})
    },
    disconnectSocket: () => {
        if(get().socket?.connected) get().socket.disconnect()
    }
}))