import { BarChart3, ChevronDown, Home, List, Tags } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'

type AdminRoute = {
	href: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	description: string;
}

type AdminDropdownProps = {
    mobile?: boolean;
}

export default function AdminDropdown({ mobile } : AdminDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const adminRoutes: AdminRoute[] = [
        {
            href: "/admin",
            label: "Propiedades",
            icon: BarChart3,
            description: "Vista general Propiedades",
        },
        {
            href: "/admin/create",
            label: "Crear Propiedad",
            icon: Home,
            description: "Registrar nueva Propiedad",
        },
        {
            href: "/admin/categories",
            label: "Categorías",
            icon: List,
            description: "Gestionar Categorías",
        },
        {
            href: "/admin/categories/create",
            label: "Crear Categoría",
            icon: Tags,
            description: "Registrar nueva categoría",
        },
    ];

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 150);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    if (mobile) {
        return (
            <div className="space-y-1">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full py-2 px-3 rounded-md text-base font-medium transition-colors dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white text-gray-700 hover:bg-white hover:text-blue-600"
                >
                    <span>Admin</span>
                    <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {isOpen && (
                    <div className="pl-4 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 ml-3">
                        {adminRoutes.map((route) => {
                            const IconComponent = route.icon;
                            return (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className="flex items-center gap-3 py-2 px-3 rounded-md text-sm font-medium transition-colors dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                                >
                                    <IconComponent className="w-4 h-4" />
                                    <div>
                                        <div className="font-medium">
                                            {route.label}
                                        </div>
                                        <div className="text-xs opacity-70">
                                            {route.description}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={dropdownRef}
        >
            <button className="flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-blue-500 dark:text-zinc-300 text-zinc-700">
                Admin
                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {/* Dropdown Menu */}
            <div
                className={`
                absolute top-full right-0 mt-2 w-72 bg-white dark:bg-zinc-800 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden z-50
                transition-all duration-200 origin-top-right
                    ${
                        isOpen
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }
                `}
            >
                {/* Header */}
                <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        Panel de Administración
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Gestiona tu plataforma
                    </p>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                    {adminRoutes.map((route) => {
                        const IconComponent = route.icon;
                        return (
                            <Link
                                key={route.href}
                                href={route.href}
                                className="group flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors duration-150"
                                onClick={() => setIsOpen(false)}
                            >
                                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors duration-150">
                                    <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">
                                        {route.label}
                                    </p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                                        {route.description}
                                    </p>
                                </div>
                                <ChevronDown className="w-4 h-4 text-zinc-400 dark:text-zinc-500 rotate-[-90deg] opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                            </Link>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Sistema activo
                    </div>
                </div>
            </div>
        </div>
    );
    
}
