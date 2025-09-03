import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import { ReactNode } from "react";

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<>
			<Hero includeImageSection={false} />
			{children}
            <Footer />
		</>
	);
}
