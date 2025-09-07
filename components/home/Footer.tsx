import { Facebook, Instagram, Linkedin, Mail, Home, Building2, UserCircle, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LogoImage from "@/public/logo-blanco.png";

export default function Footer() {
	return (
		<footer className="bg-zinc-800 dark:bg-zinc-900 text-white py-12 transition-colors duration-200">
			<div className="max-w-screen-2xl mx-auto px-4 md:px-8">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
					{/* Logo & About */}
					<div className="flex flex-col items-center lg:items-start">
						<div className="mb-4">
							<Image
								src={LogoImage}
								alt="JUP Propiedades Logo"
								width={160}
								priority
								className="object-contain"
								placeholder="empty"
							/>
						</div>
						<p className="text-sm text-gray-300 dark:text-gray-400 mt-2 text-center lg:text-left">
							Tu aliado confiable en bienes raíces. Encontramos la propiedad perfecta para ti desde 2020.
						</p>
					</div>

					{/* Navigation Links */}
					<div className="text-center lg:text-left">
						<h3 className="text-lg font-bold mb-4 flex items-center justify-center lg:justify-start">
							<Home className="w-5 h-5 mr-2" />
							Navegación
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200 text-sm"
								>
									Inicio
								</Link>
							</li>
							<li>
								<Link
									href="/about"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200 text-sm"
								>
									Nosotros
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200 text-sm"
								>
									Contacto
								</Link>
							</li>
						</ul>
					</div>

					{/* Properties Links */}
					<div className="text-center lg:text-left">
						<h3 className="text-lg font-bold mb-4 flex items-center justify-center lg:justify-start">
							<Building2 className="w-5 h-5 mr-2" />
							Propiedades
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/properties"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200 text-sm"
								>
									Todas las Propiedades
								</Link>
							</li>
							<li>
								<Link
									href="/buy"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200 text-sm"
								>
									Comprar
								</Link>
							</li>
							<li>
								<Link
									href="/rent"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200 text-sm"
								>
									Arrendar
								</Link>
							</li>
							<li>
								<Link
									href="/sell"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200 text-sm"
								>
									Vender
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact & Account */}
					<div className="text-center lg:text-left">
						<h3 className="text-lg font-bold mb-4 flex items-center justify-center lg:justify-start">
							<UserCircle className="w-5 h-5 mr-2" />
							Mi Cuenta
						</h3>
						<ul className="space-y-2 mb-6">
							<li>
								<Link
									href="/sign-in"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200 text-sm"
								>
									Iniciar Sesión
								</Link>
							</li>
							<li>
								<Link
									href="/sign-up"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200 text-sm"
								>
									Registrarse
								</Link>
							</li>
						</ul>

						{/* Contact Info */}
						<div className="space-y-2">
							<p className="flex items-center justify-center lg:justify-start text-sm">
								<Mail className="w-4 h-4 mr-2" />
								<a
									href="mailto:contact@jup.cl"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200"
								>
									contact@jup.cl
								</a>
							</p>
							<p className="flex items-center justify-center lg:justify-start text-sm">
								<Phone className="w-4 h-4 mr-2" />
								<a
									href="tel:+56982192688"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200"
								>
									+56 9 8219 2688
								</a>
							</p>
						</div>

						{/* Social Media */}
						<div className="mt-6">
							<h4 className="text-sm font-semibold mb-3 flex items-center justify-center lg:justify-start">
								Síguenos
							</h4>
							<div className="flex justify-center lg:justify-start space-x-4">
								<a
									href="https://www.facebook.com/jup.propiedades"
									className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition duration-200 p-2 rounded-full hover:bg-white/10"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Facebook de JUP Propiedades"
								>
									<Facebook size={18} />
								</a>
								<a
									href="https://www.instagram.com/jup.cl"
									className="text-gray-300 dark:text-gray-400 hover:text-pink-400 transition duration-200 p-2 rounded-full hover:bg-white/10"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Instagram de JUP Propiedades"
								>
									<Instagram size={18} />
								</a>
								<a
									href="#"
									className="text-gray-300 dark:text-gray-400 hover:text-blue-500 transition duration-200 p-2 rounded-full hover:bg-white/10"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="LinkedIn de JUP Propiedades"
								>
									<Linkedin size={18} />
								</a>
								<a
									href="mailto:contacto@jup.cl"
									className="text-gray-300 dark:text-gray-400 hover:text-green-400 transition duration-200 p-2 rounded-full hover:bg-white/10"
									aria-label="Enviar correo a soporte"
								>
									<Mail size={18} />
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Footer */}
				<div className="border-t border-slate-600 dark:border-slate-700 pt-6">
					<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						<p className="text-sm text-gray-300 dark:text-gray-400 text-center md:text-left">
							Todos los derechos reservados Javiera Urbina Propiedades &copy;{" "}
							<span className="font-bold">
								{new Date().getFullYear()}
							</span>
						</p>
						<div className="text-center md:text-right">
							<p className="text-sm text-gray-400 dark:text-gray-500 flex items-center justify-center md:justify-end">
								<MapPin className="w-4 h-4 mr-1" />
								Exequiel Fernández 3461, 7821207 Macul, Región Metropolitana
							</p>
							<p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
								Developed by:{" "}
								<a
									href="https://github.com/Thomas465xd"
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200 font-medium"
								>
									Iñigo Del Campo
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}