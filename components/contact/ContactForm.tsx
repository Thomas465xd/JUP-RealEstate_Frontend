"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, ChevronDown, Instagram, Facebook, Linkedin } from "lucide-react";

interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	subject: string;
	message: string;
}

interface FormErrors {
	firstName?: string;
	lastName?: string;
	email?: string;
	phone?: string;
	subject?: string;
	message?: string;
}

const ContactForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
	});

	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		"idle" | "success" | "error"
	>("idle");

	const subjectOptions = [
		"Comprar",
		"Vender",
		"Arrendar",
		"Servicio Legal",
		"Tasaciones",
		"Administración de Condominios",
		"Consulta General",
	];

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		if (!formData.firstName.trim()) {
			newErrors.firstName = "El nombre es requerido";
		}

		if (!formData.lastName.trim()) {
			newErrors.lastName = "El apellido es requerido";
		}

		if (!formData.email.trim()) {
			newErrors.email = "El email es requerido";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "El email no es válido";
		}

		if (!formData.subject) {
			newErrors.subject = "El asunto es requerido";
		}

		if (!formData.message.trim()) {
			newErrors.message = "El mensaje es requerido";
		} else if (formData.message.trim().length < 10) {
			newErrors.message = "El mensaje debe tener al menos 10 caracteres";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear error when user starts typing
		if (errors[name as keyof FormErrors]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const handleSubmit = async () => {
		if (!validateForm()) return;

		setIsSubmitting(true);
		setSubmitStatus("idle");

		try {
			// TODO: Implement EmailJS here
			/*
                await emailjs.send(
                    'YOUR_SERVICE_ID',
                    'YOUR_TEMPLATE_ID',
                    {
                    from_name: `${formData.firstName} ${formData.lastName}`,
                    from_email: formData.email,
                    phone: formData.phone,
                    subject: formData.subject,
                    message: formData.message,
                    },
                    'YOUR_PUBLIC_KEY'
                );
            */

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000));

			setSubmitStatus("success");

			// Reset form on success
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				phone: "",
				subject: "",
				message: "",
			});
		} catch (error) {
			console.error("Error sending message:", error);
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="py-16 bg-zinc-50 dark:bg-zinc-950">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
					{/* Left Side - Contact Information */}
					<div className="bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-900 dark:to-zinc-950/30 rounded-3xl p-8 lg:p-12 text-white border-b border-r border-blue-500 dark:border-blue-950">
						<div className="mb-8">
							<h2 className="text-3xl lg:text-4xl font-bold mb-4">
								Ponte en contacto
							</h2>
							<p className="text-zinc-300 text-lg leading-relaxed">
								¿Tienes alguna consulta sobre propiedades o
								necesitas asesoría inmobiliaria? Estamos aquí
								para ayudarte a encontrar la solución perfecta.
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
										Santiago, Chile
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
								<p>Lunes - Viernes: 9:00 AM - 6:00 PM</p>
								<p>Sábados: 10:00 AM - 2:00 PM</p>
								<p>Domingos: Cerrado</p>
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
                                <Linkedin className="w-5 h-5 text-zinc-400" />
                            </a>
                        </div>
					</div>

					{/* Right Side - Contact Form */}
					<div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 lg:p-12 shadow-xl border border-zinc-200 dark:border-zinc-800">
						<div className="space-y-6">
							{/* Name Fields */}
							<div className="grid sm:grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="firstName"
										className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
									>
										Nombre{" "}
										<span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										id="firstName"
										name="firstName"
										value={formData.firstName}
										onChange={handleInputChange}
										className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 ${
											errors.firstName
												? "border-red-500 focus:ring-red-500"
												: "border-zinc-300 dark:border-zinc-700"
										}`}
										placeholder="Tu nombre"
									/>
									{errors.firstName && (
										<p className="text-red-500 text-sm mt-1">
											{errors.firstName}
										</p>
									)}
								</div>

								<div>
									<label
										htmlFor="lastName"
										className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
									>
										Apellido{" "}
										<span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										id="lastName"
										name="lastName"
										value={formData.lastName}
										onChange={handleInputChange}
										className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 ${
											errors.lastName
												? "border-red-500 focus:ring-red-500"
												: "border-zinc-300 dark:border-zinc-700"
										}`}
										placeholder="Tu apellido"
									/>
									{errors.lastName && (
										<p className="text-red-500 text-sm mt-1">
											{errors.lastName}
										</p>
									)}
								</div>
							</div>

							{/* Email Field */}
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
								>
									Email{" "}
									<span className="text-red-500">*</span>
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 ${
										errors.email
											? "border-red-500 focus:ring-red-500"
											: "border-zinc-300 dark:border-zinc-700"
									}`}
									placeholder="tu@email.com"
								/>
								{errors.email && (
									<p className="text-red-500 text-sm mt-1">
										{errors.email}
									</p>
								)}
							</div>

							{/* Phone Field */}
							<div>
								<label
									htmlFor="phone"
									className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
								>
									Teléfono
								</label>
								<input
									type="tel"
									id="phone"
									name="phone"
									value={formData.phone}
									onChange={handleInputChange}
									className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 transition-all duration-200 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400"
									placeholder="+56 9 1234 5678"
								/>
							</div>

							{/* Subject Dropdown */}
							<div>
								<label
									htmlFor="subject"
									className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
								>
									Asunto{" "}
									<span className="text-red-500">*</span>
								</label>
								<div className="relative">
									<select
										id="subject"
										name="subject"
										value={formData.subject}
										onChange={handleInputChange}
										className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 appearance-none cursor-pointer ${
											errors.subject
												? "border-red-500 focus:ring-red-500"
												: "border-zinc-300 dark:border-zinc-700"
										}`}
									>
										<option value="">
											Selecciona un asunto
										</option>
										{subjectOptions.map((option) => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</select>
									<ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
								</div>
								{errors.subject && (
									<p className="text-red-500 text-sm mt-1">
										{errors.subject}
									</p>
								)}
							</div>

							{/* Message Field */}
							<div>
								<label
									htmlFor="message"
									className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
								>
									Mensaje{" "}
									<span className="text-red-500">*</span>
								</label>
								<textarea
									id="message"
									name="message"
									rows={6}
									value={formData.message}
									onChange={handleInputChange}
									className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 resize-none ${
										errors.message
											? "border-red-500 focus:ring-red-500"
											: "border-zinc-300 dark:border-zinc-700"
									}`}
									placeholder="Cuéntanos en qué podemos ayudarte..."
								/>
								{errors.message && (
									<p className="text-red-500 text-sm mt-1">
										{errors.message}
									</p>
								)}
							</div>

							{/* Status Messages */}
							{submitStatus === "success" && (
								<div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
									<p className="text-green-800 dark:text-green-200 text-sm font-medium">
										¡Mensaje enviado exitosamente! Te
										responderemos pronto.
									</p>
								</div>
							)}

							{submitStatus === "error" && (
								<div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
									<p className="text-red-800 dark:text-red-200 text-sm font-medium">
										Hubo un error al enviar el mensaje. Por
										favor, intenta nuevamente.
									</p>
								</div>
							)}

							{/* Submit Button */}
							<button
								type="button"
								onClick={handleSubmit}
								disabled={isSubmitting}
								className="w-full bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
							>
								{isSubmitting ? (
									<>
										<div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
										Enviando mensaje...
									</>
								) : (
									<>
										<Send className="w-5 h-5" />
										Enviar mensaje
									</>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactForm;
