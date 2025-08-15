import React from 'react'
import ThemeToggle from '../utility/DarkMode'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function ContactBar() {
    return (
        <div
            className={`
                hidden lg:block border-b dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 bg-gray-50 border-gray-200 text-gray-600
            `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-2 text-sm">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4" />
                            <span>+56 9 9863 3775</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4" />
                            <span>contacto@ovopropiedades.cl</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>Santiago, Chile</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </div>
    )
}
