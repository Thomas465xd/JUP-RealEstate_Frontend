// Add to your sign-in page temporarily
"use client";
import { useEffect } from 'react';
import SignInWindow from "@/components/auth/SignInWindow";

export default function SignInPage() {
    useEffect(() => {
        // Capture all console errors
        const originalError = console.error;
        console.error = (...args) => {
            // Store in sessionStorage so they persist
            const errors = JSON.parse(sessionStorage.getItem('clerk_errors') || '[]');
            errors.push({
                time: new Date().toISOString(),
                message: args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                ).join(' ')
            });
            sessionStorage.setItem('clerk_errors', JSON.stringify(errors));
            originalError.apply(console, args);
        };

        return () => {
            console.error = originalError;
        };
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-zinc-200">
            <SignInWindow />
        </div>
    );
}