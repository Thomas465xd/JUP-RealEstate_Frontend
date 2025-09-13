import React from 'react'
import ThemeToggle from '../utility/DarkMode'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

type ContactBarProps = {
    mobile?: boolean;
}

export default function ContactBar({ mobile = false } : ContactBarProps) {
    if(mobile) return (
        <div
            className={`pt-4 mt-4 border-t space-y-2 dark:border-zinc-700 border-zinc-200`}
        >
            <div
                className={`flex items-center space-x-2 text-sm dark:text-zinc-400 text-zinc-600`}
            >
                <Phone className="h-4 w-4" />
                <span>+56 9 9863 3775</span>
            </div>
            <div
                className={`flex items-center space-x-2 text-sm dark:text-zinc-400 text-zinc-600`}
            >
                <Mail className="h-4 w-4" />
                <span>contacto@ovopropiedades.cl</span>
            </div>
            <div 
                className={`flex items-center space-x-2 text-sm dark:text-zinc-400 text-zinc-600`}
            >
                <MapPin className="h-4 w-4" />
                <span>Santiago, Chile</span>
            </div>

            <div className="flex pace-x-4">
                <a
                    href="https://www.facebook.com/jup.propiedades"
                    className="text-gray-400 hover:text-blue-400 transition duration-200 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-white/10"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook de JUP Propiedades"
                >
                    <Facebook size={18} />
                </a>
                <a
                    href="https://www.instagram.com/jup.cl"
                    className="text-gray-400 hover:text-pink-400 transition duration-200 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-white/10"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram de JUP Propiedades"
                >
                    <Instagram size={18} />
                </a>
                <a
                    href="#"
                    className="text-gray-400 hover:text-blue-500 transition duration-200 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-white/10"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn de JUP Propiedades"
                >
                    <Linkedin size={18} />
                </a>
                <a
                    href="mailto:contacto@jup.cl"
                    className="text-gray-400 hover:text-green-400 transition-all duration-200 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-white/10"
                    aria-label="Enviar correo a soporte"
                >
                    <Mail size={18} />
                </a>
            </div>
        </div>
    )
        
    return (
        <div
            className={`
                hidden lg:block border-b dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-300 bg-gray-50 border-gray-200 text-gray-600
            `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-2 text-sm">
                    <div className="flex items-center space-x-6">
                        <a 
                            href='tel:+56982192688'
                            className="flex items-center space-x-2"
                        >
                            <Phone className="h-4 w-4" />
                            <span>+569 8219 2688</span>
                        </a>
                        <a 
                            href="mailto:contacto@jup.cl"
                            className="flex items-center space-x-2"
                        >
                            <Mail className="h-4 w-4" />
                            <span>contacto@jup.cl</span>
                        </a>
                        <a 
                            href=''
                            className="flex items-center space-x-2"
                        >
                            <MapPin className="h-4 w-4" />
                            <span>Santiago, Chile</span>
                        </a>
                    </div>

                    <div className="flex justify-center lg:justify-start space-x-4">
                        <a
                            href="https://www.facebook.com/jup.propiedades"
                            className="text-gray-400 hover:text-blue-400 transition duration-200 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-white/10"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook de JUP Propiedades"
                        >
                            <Facebook size={18} />
                        </a>
                        <a
                            href="https://www.instagram.com/jup.cl"
                            className="text-gray-400 hover:text-pink-400 transition duration-200 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-white/10"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram de JUP Propiedades"
                        >
                            <Instagram size={18} />
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-blue-500 transition duration-200 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-white/10"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn de JUP Propiedades"
                        >
                            <Linkedin size={18} />
                        </a>
                        <a
                            href="mailto:contacto@jup.cl"
                            className="text-gray-400 hover:text-green-400 transition-all duration-200 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-white/10"
                            aria-label="Enviar correo a soporte"
                        >
                            <Mail size={18} />
                        </a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </div>
    )
}
