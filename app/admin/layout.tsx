"use client"
import Hero from "@/components/home/Hero";
import { useAuth } from "@clerk/nextjs";

export default function AdminDashboard({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { getToken, isSignedIn } = useAuth();

    const handleClick = async () => {
        if (!isSignedIn) return;

        // Retrieve the JWT
        const token = await getToken();
        console.log("Session token:", token);
    };

    return (
        <>
            <Hero includeImageSection={false} />
            <button onClick={handleClick}>Get Token</button>;
            {children}
        </>
    )
}