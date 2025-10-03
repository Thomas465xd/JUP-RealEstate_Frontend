import { Facebook, Instagram, LinkedinIcon, Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

export default function ContactInformation() {
    return (
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-900 dark:to-zinc-950/30 rounded-3xl p-8 lg:p-12 text-white border-b border-r border-blue-500 dark:border-blue-950">
            <div className="mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    Ponte en contacto
                </h2>
                <p className="text-zinc-300 text-lg leading-relaxed">
                    Contáctanos y juntos encontraremos la <strong>mejor solución</strong> {" "}
                    para tus necesidades inmobiliarias. 
                    <br />
                    Tu confianza es <strong>nuestra prioridad</strong>, 
                    y nos encantaría acompañarte en cada paso de tu proyecto.
                </p>
            </div>

            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-zinc-700 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">
                            Dirección
                        </h3>
                        <p className="text-zinc-300">
                            San Carlos de Apoquindo #2991, Las Condes
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-zinc-700 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">
                            Teléfono
                        </h3>
                        <p className="text-zinc-300">
                            +56 9 8219 2688
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-zinc-700 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">
                            Email
                        </h3>
                        <p className="text-zinc-300">
                            contacto@jup.cl
                        </p>
                    </div>
                </div>
            </div>

            <div className="my-12 p-6 bg-zinc-800/50 rounded-2xl border border-zinc-700">
                <h4 className="font-semibold mb-2">
                    Horarios de Atención
                </h4>
                <div className="space-y-1 text-sm text-zinc-300">
                    <p>Lunes a Viernes 09.00 AM – 07:00 PM </p>
                    <p>Sábados y Domingos 10:00 AM - 1:00  PM</p>
                </div>
            </div>

            <div className="flex-center gap-8">
                <a
                    href='https://www.instagram.com/jup.cl'
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook de Spare Parts Trade"
                    className="flex items-center space-x-2 p-2 bg-zinc-700 hover:bg-zinc-600/30 rounded-lg transition-colors duration-300"
                >
                    <Instagram className="w-5 h-5 text-zinc-400" />
                </a>

                <a
                    href='https://www.facebook.com/jup.propiedades' 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook de Spare Parts Trade"
                    className="flex items-center space-x-2 p-2 bg-zinc-700 hover:bg-zinc-600/30 rounded-lg transition-colors duration-300"
                >
                    <Facebook className="w-5 h-5 text-zinc-400" />
                </a>

                <a
                    href='' 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook de Spare Parts Trade"
                    className="flex items-center space-x-2 p-2 bg-zinc-700 hover:bg-zinc-600/30 rounded-lg transition-colors duration-300"
                >
                    <LinkedinIcon className="w-5 h-5 text-zinc-400" />
                </a>
            </div>
        </div>
    )
}
