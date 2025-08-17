import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LogoImage from "@/public/logo-blanco.png"; // now it's a static import

export default function Footer() {
	return (
		<footer className="bg-zinc-800 text-white py-12">
			<div className="max-w-screen-2xl mx-auto px-4 md:px-8">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 place-items-center sm:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
					{/* Logo & About */}
					<div className="flex flex-col items-center md:items-start">
						<div className="mb-4">
                            <Image
                                src={LogoImage}
                                alt="Company Logo"
                                width={160}   // same as w-10 (10 * 4 = 40px)
                                priority
                                className="object-contain"
                                placeholder="empty" // disables blur placeholder
                            />
						</div>
						<p className="text-sm text-gray-300 mt-2 text-center md:text-left">
							Providing quality spare parts and exceptional
							service since 2020.
						</p>
					</div>

					{/* Quick Links */}
					<div className="">
						<h3 className="text-lg font-bold mb-4">Propiedades</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/products"
									className="text-gray-300 hover:text-white transition"
								>
									Todas las Propiedades
								</Link>
							</li>
							<li>
								<Link
									href="/cart"
									className="text-gray-300 hover:text-white transition"
								>
									Carrito
								</Link>
							</li>
							<li>
								<Link
									href="/cart/checkout"
									className="text-gray-300 hover:text-white transition"
								>
									Checkout
								</Link>
							</li>
						</ul>
					</div>

					{/* Customer Area */}
					<div>
						<h3 className="text-lg font-bold mb-4">Mi Cuenta</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/profile"
									className="text-gray-300 hover:text-white transition"
								>
									Mi Perfil
								</Link>
							</li>
							<li>
								<Link
									href="/profile/password"
									className="text-gray-300 hover:text-white transition"
								>
									Cambiar Contraseña
								</Link>
							</li>
							<li>
								<Link
									href="/orders"
									className="text-gray-300 hover:text-white transition"
								>
									Mis Pedidos
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact & Social */}
					<div>
						<h3 className="text-lg font-bold mb-4">Contacto</h3>
						<p>
							<a
								href="mailto:equipo@portalspt.cl"
								className="text-gray-300 hover:text-white transition"
							>
								equipo@portalspt.cl
							</a>
						</p>
						<p>
							<a
								href="tel:+56912345678"
								className="text-gray-300 hover:text-white transition"
							>
								+56 9 4526 1478
							</a>
						</p>

						{/* Social Media */}
						<div className="mt-6">
							<h4 className="text-sm font-semibold mb-3">
								Síguenos
							</h4>
							<div className="flex space-x-4">
								<a
									href="https://www.facebook.com/Spare.parts.trade"
									className="text-gray-300 hover:text-white transition"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Facebook de Spare Parts Trade"
								>
									<Facebook size={20} />
								</a>
								<a
									href="https://www.instagram.com/spare.parts.trade/?hl=es-la"
									className="text-gray-300 hover:text-white transition"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Instagram de Spare Parts Trade"
								>
									<Instagram size={20} />
								</a>
								<a
									href="https://cl.linkedin.com/company/spare-parts-trade?trk=public_post_reshare_feed-actor-name"
									className="text-gray-300 hover:text-white transition"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="LinkedIn de Spare Parts Trade"
								>
									<Linkedin size={20} />
								</a>
								<a
									href="mailto:soporte@portalspt.cl"
									className="text-gray-300 hover:text-white transition"
									aria-label="Enviar correo a soporte"
								>
									<Mail size={20} />
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Footer */}
				<div className="border-t border-slate-600 pt-6">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-sm text-gray-300">
							Todos los derechos reservados Javiera Urbina Propiedades
							&copy;{" "}
							<span className="font-bold">
								{new Date().getFullYear()}
							</span>
						</p>
						<div className="mt-4 md:mt-0">
							<p className="text-sm text-gray-400">
								Exequiel Fernández 3461, 7821207 Macul, Región
								Metropolitana
							</p>
                            <p className="text-xs text-gray-400">
                                Developed by: <a href="https://github.com/Thomas465xd" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">Iñigo Del Campo</a>
                            </p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}