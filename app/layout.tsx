import { type Metadata } from "next";
import {
	ClerkProvider,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Theme } from "@/components/providers/ThemeProvider";
import ToastProvider from "@/components/providers/ToastProviders";
import ReactQueryProvider from "@/components/providers/QueryClientProvider";
import { TokenProvider } from "@/components/providers/TokenProvider";
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import WhatsappButton from "@/components/utility/WhatsappButton";
import BackToTopButton from "@/components/utility/BackToTop";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
        template: "%s | JUP",
        default: "Bienvenido a JUP Propiedades"
    },
	description: "Broker de propiedades parte the JUP Propiedades",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html 
                lang="en"
                suppressHydrationWarning
            >
				<body
                    suppressHydrationWarning
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
                    <TokenProvider>
                        <ReactQueryProvider>
                            <Theme>
                                <ToastProvider />
                                {children}
                                <BackToTopButton />
                                <WhatsappButton />
                            </Theme>
                        </ReactQueryProvider>
                    </TokenProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
