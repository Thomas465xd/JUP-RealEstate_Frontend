import React from 'react'
import ThemeToggle from '../utility/DarkMode'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

//TODO: Set actual link routes
export default function ContactBar() {
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

                    <div className="flex items-center space-x-6">
                        <a
                            href='https://www.instagram.com/jup.cl'
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook de Spare Parts Trade"
                            className="flex items-center space-x-2 p-2 bg-zinc-100 dark:bg-zinc-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-300"
                        >
                            <Instagram className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                        </a>

                        <a
                            href='https://www.facebook.com/jup.propiedades' 
                            target="_blank"
							rel="noopener noreferrer"
							aria-label="Facebook de Spare Parts Trade"
                            className="flex items-center space-x-2 p-2 bg-zinc-100 dark:bg-zinc-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-300"
                        >
                            <Facebook className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                        </a>

                        <a
                            href='' 
                            target="_blank"
							rel="noopener noreferrer"
							aria-label="Facebook de Spare Parts Trade"
                            className="flex items-center space-x-2 p-2 bg-zinc-100 dark:bg-zinc-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-300"
                        >
                            <Linkedin className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
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
