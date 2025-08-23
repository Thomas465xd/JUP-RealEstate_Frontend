"use client";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

// Type for the token getter function
type GetTokenFunction = () => Promise<string | null | undefined>;

// Create the base API instance
const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL
});

// Variable to store the getToken function
let getTokenFunction: GetTokenFunction | null = null;

// Set up the request interceptor
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    //? Debug log
    console.log("🔍 Interceptor running, getTokenFunction:", !!getTokenFunction); 
    
    try {
        if (getTokenFunction) {
            //? Debug log
            console.log("🔑 Getting token...");
            const token = await getTokenFunction();

            //? Debug log
            console.log("🔑 Token received:", token ? "✅ Yes" : "❌ No");
            
            if (token) {
                if (!config.headers) {
                    config.headers = {} as any;
                }
                config.headers.Authorization = `Bearer ${token}`;

                //? Debug log
                console.log("🔑 Token set in headers");
            }
        } else {
            //? Debug log
            console.log("❌ No getTokenFunction available");
        }
    } catch (error) {
        //? Debug log
        console.error('Error getting Clerk token:', error);
    }
    
    return config;
});

// Function to set the token getter
export const setAuthTokenGetter = (tokenGetter: GetTokenFunction): void => {
    //? Debug log
    console.log("📝 Setting token getter function");
    getTokenFunction = tokenGetter;
};

// Function to clear the token getter
export const clearAuthTokenGetter = (): void => {
    //? Debug log
    console.log("🗑️ Clearing token getter function");
    getTokenFunction = null;
};

export default api;