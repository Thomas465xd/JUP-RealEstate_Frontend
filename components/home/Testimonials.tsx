"use client";

import { useAuth } from "@clerk/nextjs";

export default function MyComponent() {
    const { getToken, isSignedIn } = useAuth();

    const handleClick = async () => {
        if (!isSignedIn) return;

        // Retrieve the JWT
        const token = await getToken();
        console.log("Session token:", token);
    };

    return (
        <div className="p-20">
            <h2 className="text-3xl font-bold text-center mb-10">Testimonials</h2>
            <div className="max-w-4xl mx-auto">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                    "JUP Propiedades made my home buying experience seamless and stress-free. Their team was professional, knowledgeable, and always available to answer my questions. Highly recommend!"
                </p>
                <p className="mt-4 text-right text-gray-500">- Happy Client</p>
            </div>

            <button className="cursor-pointer" onClick={handleClick}>Get Token</button>
        </div>
    )
}
