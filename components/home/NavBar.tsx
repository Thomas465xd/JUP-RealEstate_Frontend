import Link from "next/link";
import Loader from "../utility/Loader";
import { useAuth } from "@/src/hooks/useAuth";

type NavBarProps = {
    mobile?: boolean; 
    menuOpen?: boolean;
}

export default function NavBar({ mobile = false } : NavBarProps) {
    const { isAdmin, isLoading } = useAuth();
    console.log(isAdmin)

	const navigationItems = [
		{ href: "/", label: "Inicio" },
		{ href: "/home/properties", label: "Propiedades" },
		{ href: "/home/buy", label: "Comprar" },
		{ href: "/home/sell", label: "Vender" },
		{ href: "/home/rent", label: "Arrendiendo" },
		{ href: "/home/about", label: "Sobre Nosotros" },
		{ href: "/home/contact", label: "Contacto" },

        ...(isAdmin ? [{ href: "/admin", label: "Admin" }] : []),
	];
    
    if (isLoading) return <Loader />

    return (
        <>
            {!mobile ? (
                <nav className="hidden lg:flex items-center space-x-8">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                text-sm font-medium transition-colors duration-200 
                                hover:text-blue-500 dark:text-zinc-300 text-zinc-700
                            `}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

            ) : (
                <nav>  
                    {navigationItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block py-2 px-3 rounded-md text-base font-medium transition-colors dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white text-gray-700 hover:bg-white hover:text-blue-600`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            )}
        </>
    );
}
