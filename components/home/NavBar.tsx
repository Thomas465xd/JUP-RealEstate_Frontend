import React from "react";
import Link from "next/link";
import { useAuth } from "@/src/hooks/useAuth";
import Loader from "../utility/Loader";
import AdminDropdown from "../admin/AdminDropdown";

type NavBarProps = {
	mobile?: boolean;
	menuOpen?: boolean;
};

export default function NavBar({ mobile = false }: NavBarProps) {
	const { isAdmin, isLoading } = useAuth();

	const navigationItems = [
		{ href: "/", label: "Inicio" },
		{ href: "/home/properties", label: "Propiedades" },
        { href: "/home/categories", label: "Categorías"},
		{ href: "/home/services", label: "Servicios" },
		{ href: "/home/about", label: "Sobre Nosotros" },
		{ href: "/home/questions", label: "Preguntas Frecuentes" },
		{ href: "/home/contact", label: "Contacto" },
	];

	if (isLoading) return <Loader />;

	return (
		<>
			{!mobile ? (
				<nav className="hidden lg:flex items-center space-x-8">
					{navigationItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="text-sm font-medium transition-colors duration-200 hover:text-blue-500 dark:text-zinc-300 text-zinc-700"
						>
							{item.label}
						</Link>
					))}
					{isAdmin && <AdminDropdown />}
				</nav>
			) : (
				<nav className="space-y-1">
					{navigationItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="block py-2 px-3 rounded-md text-base font-medium transition-colors dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white text-gray-700 hover:bg-white hover:text-blue-600"
						>
							{item.label}
						</Link>
					))}
					{isAdmin && <AdminDropdown mobile={true} />}
				</nav>
			)}
		</>
	);
}
