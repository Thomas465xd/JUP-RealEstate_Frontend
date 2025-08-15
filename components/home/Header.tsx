"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, Sun, Moon } from "lucide-react";
import ContactBar from "./ContactBar";
import Logo from "../utility/Logo";
import AuthButtons from "../auth/AuthButtons";

interface HeaderProps {
	darkMode?: boolean;
	onToggleDarkMode?: () => void;
}

export default function Header({
	darkMode = false,
	onToggleDarkMode,
}: HeaderProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navigationItems = [
		{ href: "/", label: "Inicio" },
		{ href: "/properties", label: "Propiedades" },
		{ href: "/buy", label: "Comprar" },
		{ href: "/sell", label: "Vender" },
		{ href: "/rent", label: "Arrendiendo" },
		{ href: "/about", label: "Sobre Nosotros" },
		{ href: "/contact", label: "Contacto" },
	];

	return (
		<div
			className={`sticky top-0 z-50 transition-all duration-300 ${
				darkMode ? "bg-gray-900" : "bg-white"
			} ${isScrolled ? "shadow-lg backdrop-blur-sm bg-opacity-95" : ""}`}
		>

			{/* Main Header */}
			<header
				className={`relative ${darkMode ? "bg-gray-900" : "bg-white"}`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16 lg:h-20">
						{/* Logo */}
                        <Logo />

						{/* Desktop Navigation */}
						<nav className="hidden lg:flex items-center space-x-8">
							{navigationItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className={`text-sm font-medium transition-colors duration-200 hover:text-orange-500 ${
										darkMode
											? "text-gray-300"
											: "text-gray-700"
									}`}
								>
									{item.label}
								</Link>
							))}
						</nav>

						{/* Right Side Actions */}
						<div className="flex items-center space-x-4">
							{/* Mobile Dark Mode Toggle */}
							<button
								onClick={onToggleDarkMode}
								className={`lg:hidden p-2 rounded-full transition-colors ${
									darkMode
										? "text-yellow-400 hover:bg-gray-800"
										: "text-gray-500 hover:bg-gray-100"
								}`}
							>
								{darkMode ? (
									<Sun className="h-5 w-5" />
								) : (
									<Moon className="h-5 w-5" />
								)}
							</button>

							{/* Auth Buttons */}
                            <AuthButtons />

							{/* Mobile Menu Button */}
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className={`lg:hidden p-2 rounded-md transition-colors ${
									darkMode
										? "text-gray-300 hover:bg-gray-800"
										: "text-gray-700 hover:bg-gray-100"
								}`}
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
						className={`border-t ${
							darkMode
								? "bg-gray-800 border-gray-700"
								: "bg-gray-50 border-gray-200"
						}`}
					>
						<div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-3">
							{navigationItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									onClick={() => setIsMenuOpen(false)}
									className={`block py-2 px-3 rounded-md text-base font-medium transition-colors ${
										darkMode
											? "text-gray-300 hover:bg-gray-700 hover:text-white"
											: "text-gray-700 hover:bg-white hover:text-orange-600"
									}`}
								>
									{item.label}
								</Link>
							))}

							{/* Mobile Contact Info */}
							<div
								className={`pt-4 mt-4 border-t space-y-2 ${
									darkMode
										? "border-gray-700"
										: "border-gray-200"
								}`}
							>
								<div
									className={`flex items-center space-x-2 text-sm ${
										darkMode
											? "text-gray-400"
											: "text-gray-600"
									}`}
								>
									<Phone className="h-4 w-4" />
									<span>+56 9 9863 3775</span>
								</div>
								<div
									className={`flex items-center space-x-2 text-sm ${
										darkMode
											? "text-gray-400"
											: "text-gray-600"
									}`}
								>
									<Mail className="h-4 w-4" />
									<span>contacto@ovopropiedades.cl</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}
