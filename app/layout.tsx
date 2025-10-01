import { type Metadata, type Viewport } from "next";
import {
	ClerkProvider,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { Theme } from "@/components/providers/ThemeProvider";
import ToastProvider from "@/components/providers/ToastProviders";
import ReactQueryProvider from "@/components/providers/QueryClientProvider";
import { TokenProvider } from "@/components/providers/TokenProvider";
import WhatsappButton from "@/components/utility/WhatsappButton";
import BackToTopButton from "@/components/utility/BackToTop";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
	display: "swap",
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
	display: "swap",
});

// SEO Configuration
const siteConfig = {
	name: "JUP Propiedades",
	title: "JUP Propiedades ",
	description: "Encuentra la propiedad de tus sueños con JUP Propiedades. Especialistas en compra, venta y arriendo de propiedades en Chile. Más de X años de experiencia en el mercado inmobiliario.",
	url: "https://www.jup.cl", // Replace with your actual domain
	siteName: "JUP Propiedades",
	locale: "es_CL",
	type: "website",
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" }
	],
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
};

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		template: `%s | ${siteConfig.name}`,
		default: siteConfig.title,
	},
	description: siteConfig.description,
	keywords: [
		"propiedades Chile",
		"bienes raíces",
		"compra venta propiedades",
		"arriendo casas",
		"departamentos en venta",
		"broker inmobiliario",
		"JUP Propiedades",
		"inmobiliaria Chile",
		"casas en venta",
		"propiedades comerciales",
		"inversión inmobiliaria",
		"tasaciones",
		"asesoría inmobiliaria"
	],
	authors: [
		{
			name: siteConfig.name,
			url: siteConfig.url,
		}
	],
	creator: siteConfig.name,
	publisher: siteConfig.name,
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	
	// Open Graph
	openGraph: {
		type: "website",
		locale: siteConfig.locale,
		url: siteConfig.url,
		title: siteConfig.title,
		description: siteConfig.description,
		siteName: siteConfig.siteName,
        images: [
            {
                url: `${siteConfig.url}/og-image.png`,
                width: 1200,
                height: 630,
                alt: `${siteConfig.name} - Tu Broker de Confianza`,
            },
            {
                url: `${siteConfig.url}/og-image-square.png`,
                width: 1080,
                height: 1080,
                alt: `${siteConfig.name} - Tu Broker de Confianza`,
            },
        ],
	},

	// Additional Meta Tags
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},

	// Verification (add your verification codes)
	verification: {
		google: "your-google-verification-code", // Replace with actual code
		yandex: "your-yandex-verification-code", // Replace with actual code
		yahoo: "your-yahoo-verification-code", // Replace with actual code
		other: {
			"facebook-domain-verification": "your-facebook-verification-code", // Replace with actual code
		}
	},

	// App-specific
	alternates: {
		canonical: siteConfig.url,
		languages: {
			"es-CL": siteConfig.url,
			"es": `${siteConfig.url}/es`,
		},
	},

	// Category
	category: "Real Estate",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Structured Data for SEO
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": `${siteConfig.url}/#organization`,
				"name": siteConfig.name,
				"url": siteConfig.url,
				"sameAs": [
					"https://www.facebook.com/jup.propiedades", // Replace with actual URLs
					"https://www.instagram.com/jup.cl",
					"https://wa.me/56982192688" // Replace with actual WhatsApp number
				],
				"logo": {
					"@type": "ImageObject",
					"inLanguage": "es-CL",
					"@id": `${siteConfig.url}/#logo`,
					"url": `${siteConfig.url}/logo-color.png`,
					"contentUrl": `${siteConfig.url}/logo-color.png`,
					"width": 300,
					"height": 100,
					"caption": siteConfig.name
				},
				"image": { "@id": `${siteConfig.url}/#logo` },
				"contactPoint": {
					"@type": "ContactPoint",
					"telephone": "+56-9-8219-2688", // Replace with actual phone
					"contactType": "customer service",
					"availableLanguage": ["Spanish"],
					"areaServed": "CL"
				},
				"address": {
					"@type": "PostalAddress",
					"streetAddress": "San Carlos de Apoquindo #2991, Las Condes", // Replace with actual address
					"addressLocality": "Santiago",
					"addressRegion": "Región Metropolitana",
					"postalCode": "7500000",
					"addressCountry": "CL"
				}
			},
			{
				"@type": "WebSite",
				"@id": `${siteConfig.url}/#website`,
				"url": siteConfig.url,
				"name": siteConfig.name,
				"description": siteConfig.description,
				"publisher": { "@id": `${siteConfig.url}/#organization` },
				"inLanguage": "es-CL"
			}
		]
	};

	return (
		<ClerkProvider>
			<html 
				lang="es-CL"
				suppressHydrationWarning
				className="scroll-smooth"
			>
				<head>
					{/* Preload Critical Resources */}
					<link rel="preload" as="image" href="/logo-color.png" fetchPriority="high" />
					<link rel="preload" as="image" href="/hero-image-1.jpg" fetchPriority="high" />
					
					{/* DNS Prefetch & Preconnect */}
					<link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
					<link rel="dns-prefetch" href="https://res.cloudinary.com" />
					<link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
					<link rel="dns-prefetch" href="https://fonts.gstatic.com" />
					
					{/* Favicons */}
					<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/manifest.json" />
					<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
					<meta name="msapplication-TileColor" content="#ffffff" />
					
					{/* Additional Meta Tags */}
					<meta name="application-name" content={siteConfig.name} />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="apple-mobile-web-app-status-bar-style" content="default" />
					<meta name="apple-mobile-web-app-title" content={siteConfig.name} />
					<meta name="mobile-web-app-capable" content="yes" />
					<meta name="msapplication-config" content="/browserconfig.xml" />
					<meta name="msapplication-TileColor" content="#ffffff" />
					
					{/* Security Headers */}
					<meta name="referrer" content="origin-when-cross-origin" />
					
					{/* Structured Data */}
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
					/>
					
					{/* Additional SEO Meta Tags */}
					<meta name="geo.region" content="CL-RM" />
					<meta name="geo.placename" content="Santiago, Chile" />
					<meta name="geo.position" content="-33.4489;-70.6693" />
					<meta name="ICBM" content="-33.4489, -70.6693" />
				</head>
				<body
					suppressHydrationWarning
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<TokenProvider>
						<ReactQueryProvider>
							<Theme>
								<ToastProvider />
                                <Analytics />
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