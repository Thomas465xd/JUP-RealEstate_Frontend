import Hero from "@/components/home/Hero";

export default function AdminDashboard({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <Hero includeImageSection={false} />
            {children}
        </main>
    )
}