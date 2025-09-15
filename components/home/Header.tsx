"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, Sun, Moon, MapPin } from "lucide-react";
import ContactBar from "./ContactBar";
import Logo from "../utility/Logo";
import AuthButtons from "../auth/AuthButtons";
import ThemeToggle from "../utility/DarkMode";
import NavBar from "./NavBar";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);



	return (
		<div
            suppressHydrationWarning
			className={`
                dark:bg-zinc-900 bg-white sticky top-0 z-50 transition-all duration-300 
			    ${isScrolled ? "shadow-lg backdrop-blur-sm bg-opacity-95" : ""}
            `}
		>

			{/* Main Header */}
			<header
				className={`relative dark:bg-zinc-900 bg-zinc-50`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex-between h-20 lg:h-24">
						{/* Logo */}
                        <Logo />

                        <NavBar />

						{/* Right Side Actions */}
						<div className="flex items-center space-x-4">
							{/* Auth Buttons */}
                            <AuthButtons />

							{/* Mobile Menu Button */}
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className={`lg:hidden p-2 rounded-md transition-colors dark:text-gray-300 dark:hover:bg-gray-800 text-gray-700 hover:bg-gray-100`}
							>
								{isMenuOpen ? (
									<X className="h-6 w-6" />
								) : (
									<Menu className="h-6 w-6" />
								)}
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Menu */}
				<div
					className={`lg:hidden transition-all duration-300 ease-in-out ${
						isMenuOpen
							? "max-h-96 opacity-100"
							: "max-h-0 opacity-0 overflow-hidden"
					}`}
				>
					<div
						className={`border-t dark:bg-zinc-800 drak:border-zinc-700 bg-zinc-50 border-gray-200`}
					>
						<div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-3 border-b-2 border-zinc-300 dark:border-zinc-700">

                            <NavBar 
                                mobile 
                                menuOpen={isMenuOpen}
                            />

							{/* Mobile Contact Info */}
                            <ContactBar
                                mobile 
                            />
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}
