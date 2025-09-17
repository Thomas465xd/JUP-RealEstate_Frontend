"use client";
import { clearAuthTokenGetter, setAuthTokenGetter } from "@/lib/axios";
import { useAuth } from "@clerk/nextjs";
import { useEffect, ReactNode } from "react";
import Skeleton from "../skeletons/Skeleton";

interface TokenProviderProps {
    children: ReactNode;
}

export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
    const { getToken, isSignedIn, isLoaded } = useAuth();
    
    useEffect(() => {
        //! Don't do anything until Clerk is fully loaded
        if (!isLoaded) {
            //? Debug log
            console.log("⏳ Clerk not loaded yet, waiting...");
            return;
        }

        //? Debug log
        console.log("🔍 Clerk loaded. Auth state:", { isSignedIn, hasGetToken: !!getToken });

        if (isSignedIn && getToken) {
            //? Debug log
            console.log("✅ Setting token getter");
            setAuthTokenGetter(getToken);
        } else {
            //? Debug log
            console.log("❌ Clearing token getter");
            clearAuthTokenGetter();
        }

        // Cleanup on unmount
        return () => {
            clearAuthTokenGetter();
        };
    }, [isSignedIn, getToken, isLoaded]); // Make sure isLoaded is in the dependency array

    // Optionally show loading state while Clerk loads
    if (!isLoaded) {
        return <Skeleton />;
    }

    return <>{children}</>;
};