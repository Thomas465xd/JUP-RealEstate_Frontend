"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
	Upload,
	X,
	Home,
	MapPin,
	DollarSign,
	Camera,
	Plus,
    House,
    PencilRuler,
    Car,
    BedDouble,
    Bath,
} from "lucide-react";
import { PropertyForm } from "@/src/types";
import ErrorMessage from "../../utility/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProperty } from "@/src/api/PropertyAPI";
import { toast } from "react-toastify";
import { CldUploadWidget } from 'next-cloudinary';
import Link from "next/link";

const propertyTypes = [
	{ value: "casa", label: "Casa" },
	{ value: "departamento", label: "Departamento" },
	{ value: "parcela", label: "Parcela" },
	{ value: "sitio", label: "Sitio" },
	{ value: "oficina", label: "Oficina" },
	{ value: "comercial", label: "Comercial" },
];

const propertyStatus = [
	{ value: "disponible", label: "Disponible" },
	{ value: "vendida", label: "Vendida" },
	{ value: "pendiente", label: "Pendiente" },
];

const regions = [
	"Arica y Parinacota",
	"Tarapacá",
	"Antofagasta",
	"Atacama",
	"Coquimbo",
	"Valparaíso",
	"Metropolitana de Santiago",
	"O'Higgins",
	"Maule",
	"Ñuble",
	"Biobío",
	"La Araucanía",
	"Los Ríos",
	"Los Lagos",
	"Aysén",
	"Magallanes",
];

export default function CreatePropertyForm() {
	const [uploadedImages, setUploadedImages] = useState<string[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
    const queryClient = useQueryClient();

    // Delete property mutation
    const { mutate } = useMutation({
        mutationFn: (formData: PropertyForm) => createProperty(formData),
        onError: (error) => {
            toast.error(error.message || "Error al eliminar la propiedad");
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["properties"] });
            toast.success(data.message ||"Propiedad Registrada Exitosamente");
            reset();
        }
    });

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		reset,
	} = useForm<PropertyForm>({
		defaultValues: {
            title: "", 
            description: "", 
            type: "casa", 
			status: "disponible",
            price: 0, 
            address: "", 
            area: 0, 
            cityArea: "", 
            region: "Metropolitana de Santiago",
			condo: false,
			dorms: 0,
			bathrooms: 0,
			parkingSpaces: 0,
			imageUrls: [],
		},
        mode: "onChange"
	});

    React.useEffect(() => {
        register('imageUrls', {
            required: 'Se requieren al menos 4 imágenes',
            validate: (value) => {
                if (!value || value.length < 4) {
                    return 'Se requieren al menos 4 imágenes';
                }
                
                return true;
            }
        });
    }, [register]);

    // Replace your handleImageUpload function with this:
    const handleCloudinaryUpload = (result: any) => {
        if (result.event === 'success') {
            const imageUrl = result.info.secure_url;

            setUploadedImages((prev) => {

                const newImages = [...prev, imageUrl];
                // Use setValue with validation trigger
                setValue("imageUrls", newImages, { 
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true 
                });

                return newImages;
            });
        }
    };

    // Also update your removeImage function:
    const removeImage = (index: number) => {
        setUploadedImages((prev) => {
            const newImages = prev.filter((_, i) => i !== index);
                // Trigger validation when removing images too
                setValue("imageUrls", newImages, { 
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true 
            });

            return newImages;
        });
    };

	const onSubmit = async (formData: PropertyForm) => {
		setIsSubmitting(true);
		try {
			console.log("Datos del formulario:", formData);
            if (uploadedImages.length < 4) {
                toast.error("Se requieren al menos 4 imágenes");
                return;
            }

			
            //! Call the create property mutation 
			await mutate(formData)
			setUploadedImages([]);
		} catch (error) {
			console.error("Error creating property:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white transition-colors duration-300">
			<div className="max-w-7xl mx-auto px-4 py-8">
				{/* Header */}
                <div className="flex justify-between items-center">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            Registrar Nueva Propiedad
                        </h1>
                        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                            Complete todos los campos para registrar una nueva
                            propiedad
                        </p>
                    </div>

                    <Link
                        href={"/admin"}
                        className="group bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-800 bg-[length:200%_200%] 
                                bg-[position:0%_50%] hover:bg-[position:100%_50%] transition-all duration-500 
                                px-8 py-2 rounded-md flex items-center gap-2 text-white"
                    >
                        <House size={20} />
                        Volver al Panel
                    </Link>
                </div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Form Fields - Left Side (2/3 width) */}
					<div className="lg:col-span-2 space-y-6">
						{/* Basic Information Card */}
						<div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 transition-colors">
							<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
								<Home size={20} className="text-blue-500" />
								Información Básica
							</h2>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="md:col-span-2">
									<label className="block text-sm font-medium mb-2">
										Título de la Propiedad *
									</label>
									<input
										{...register("title", {
											required:
												"El título es obligatorio",
											minLength: {
												value: 3,
												message:
													"El título debe tener al menos 3 caracteres",
											},
										})}
										type="text"
										placeholder="Casa moderna con vista al mar..."
										className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
									/>
									{errors.title && <ErrorMessage variant="inline">{errors.title.message}</ErrorMessage>}
								</div>

								<div>
									<label className="block text-sm font-medium mb-2">
										Tipo de Propiedad *
									</label>
									<select
										{...register("type", {
											required:
												"Debe seleccionar un tipo de propiedad",
										})}
										className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
									>
										<option value="">
											Seleccionar tipo
										</option>
										{propertyTypes.map((type) => (
											<option
												key={type.value}
												value={type.value}
											>
												{type.label}
											</option>
										))}
									</select>
									{errors.type && <ErrorMessage variant="inline">{errors.type.message}</ErrorMessage>}
								</div>

								<div>
									<label className="block text-sm font-medium mb-2">
										Estado *
									</label>
									<select
										{...register("status")}
										className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
									>
										{propertyStatus.map((status) => (
											<option
												key={status.value}
												value={status.value}
											>
												{status.label}
											</option>
										))}
									</select>
								</div>

								<div className="md:col-span-2">
									<label className="block text-sm font-medium mb-2">
										Descripción *
									</label>
									<textarea
										{...register("description", {
											required:
												"La descripción es obligatoria",
											minLength: {
												value: 10,
												message:
													"La descripción debe tener al menos 10 caracteres",
											},
										})}
										rows={4}
										placeholder="Describe las características principales de la propiedad..."
										className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none transition-colors"
									/>
                                    {errors.description && <ErrorMessage variant="inline">{errors.description.message}</ErrorMessage>}
								</div>
							</div>
						</div>

						{/* Price & Location Card */}
						<div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 transition-colors">
							<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
								<MapPin size={20} className="text-green-500" />
								Precio y Ubicación
							</h2>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium mb-2">
										Precio (UF) *
									</label>
									<div className="relative">
										<DollarSign
											size={20}
											className="absolute left-3 top-3 text-zinc-400"
										/>
										<input
											{...register("price", {
												required:
													"El precio es obligatorio",
												min: {
													value: 1,
													message:
														"El precio debe ser mayor a 0",
												},
												valueAsNumber: true,
											})}
											type="number"
											step="0.01"
											placeholder="0.00"
											className="w-full pl-12 pr-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
										/>
									</div>
									{errors.price && <ErrorMessage variant="inline">{errors.price.message}</ErrorMessage>}
								</div>

								<div>
									<label className="flex gap-2 items-center text-sm font-medium mb-2">
										<PencilRuler size={16}/> Área (m²) *
									</label>
									<input
										{...register("area", {
											required: "El área es obligatoria",
											min: {
												value: 1,
												message:
													"El área debe ser mayor a 0",
											},
											valueAsNumber: true,
										})}
										type="number"
										placeholder="120"
										className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
									/>
									{errors.area && <ErrorMessage variant="inline">{errors.area.message}</ErrorMessage>}
								</div>

								<div>
									<label className="block text-sm font-medium mb-2">
										Región *
									</label>
									<select
										{...register("region", {
											required:
												"Debe seleccionar una región",
										})}
										className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
									>
										<option value="">
											Seleccionar región
										</option>
										{regions.map((region) => (
											<option key={region} value={region}>
												{region}
											</option>
										))}
									</select>
									{errors.region && <ErrorMessage variant="inline">{errors.region.message}</ErrorMessage>}
								</div>

								<div>
									<label className="block text-sm font-medium mb-2">
										Ciudad/Área *
									</label>
									<input
										{...register("cityArea", {
											required:
												"La ciudad/área es obligatoria",
											minLength: {
												value: 2,
												message:
													"La ciudad/área debe tener al menos 2 caracteres",
											},
										})}
										type="text"
										placeholder="Las Condes, Santiago"
										className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
									/>
									{errors.cityArea && <ErrorMessage variant="inline">{errors.cityArea.message}</ErrorMessage>}
								</div>

								<div className="md:col-span-2">
									<label className="block text-sm font-medium mb-2">
										Dirección *
									</label>
									<input
										{...register("address", {
											required:
												"La dirección es obligatoria",
											minLength: {
												value: 5,
												message:
													"La dirección debe tener al menos 5 caracteres",
											},
										})}
										type="text"
										placeholder="Av. Providencia 1234, Providencia"
										className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
									/>
									{errors.address && <ErrorMessage variant="inline">{errors.address.message}</ErrorMessage>}
								</div>
							</div>
						</div>

						{/* Property Details Card */}
						<div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 transition-colors">
							<h2 className="text-xl font-semibold mb-4">
								Características
							</h2>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div>
									<label className="flex items-center gap-2 text-sm font-medium mb-2">
										<BedDouble size={20} /> Dormitorios *
									</label>
									<input
										{...register("dorms", {
											required:
												"Los dormitorios no pueden estar vacíos",
											min: {
												value: 0,
												message:
													"Los dormitorios deben ser 0 o más",
											},
											valueAsNumber: true,
										})}
										type="number"
										min="0"
										placeholder="3"
										className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
									/>
									{errors.dorms && <ErrorMessage variant="inline">{errors.dorms.message}</ErrorMessage>}
								</div>

								<div>
									<label className="flex items-center gap-2 text-sm font-medium mb-2">
										<Bath size={20} /> Baños *
									</label>
									<input
										{...register("bathrooms", {
											required:
												"Los baños no pueden estar vacíos",
											min: {
												value: 0,
												message:
													"Los baños deben ser 0 o más",
											},
											valueAsNumber: true,
										})}
										type="number"
										min="0"
										placeholder="2"
										className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
									/>
									{errors.bathrooms && <ErrorMessage variant="inline">{errors.bathrooms.message}</ErrorMessage>}
								</div>

								<div>
									<label className="flex items-center gap-2 text-sm font-medium mb-2">
										<Car size={20} /> Estacionamientos *
									</label>
									<input
										{...register("parkingSpaces", {
											required:
												"Los estacionamientos no pueden estar vacíos",
											min: {
												value: 0,
												message:
													"Los estacionamientos deben ser 0 o más",
											},
											valueAsNumber: true,
										})}
										type="number"
										min="0"
										placeholder="2"
										className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
									/>
									{errors.parkingSpaces && <ErrorMessage variant="inline">{errors.parkingSpaces.message}</ErrorMessage>}
								</div>
							</div>

							<div className="mt-4">
								<label className="flex items-center gap-2">
									<input
										{...register("condo")}
										type="checkbox"
										className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
									/>
									<span className="text-sm font-medium">
										¿Es condominio?
									</span>
								</label>
							</div>
						</div>
					</div>

					{/* Image Upload & Summary - Right Side (1/3 width) */}
					<div className="space-y-6 sticky top-30 self-start">
						<div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 transition-colors">
							<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
								<Camera size={20} className="text-blue-500" />
								Imágenes de la Propiedad
							</h2>

							<p className="text-sm mb-4 text-zinc-600 dark:text-zinc-400">
								Sube al menos 4 imágenes de alta calidad de la
								propiedad
							</p>

							{/* Upload Button */}
                            <div className="mb-4">
                                <CldUploadWidget
                                    uploadPreset="next_jup-propiedades" // Replace with your Cloudinary upload preset
                                    options={{
                                    multiple: true,
                                        maxFiles: 10,
                                        resourceType: "image",
                                        folder: "properties", // Optional: organize images in folders
                                    }}
                                    onSuccess={handleCloudinaryUpload}
                                >
                                    {({ open }) => (
                                    <div 
                                        onClick={() => open()}
                                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-8 h-8 mb-2 text-zinc-500 dark:text-zinc-400" />
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                            <span className="font-semibold">Click para subir</span> o arrastra las imágenes
                                        </p>
                                        </div>
                                    </div>
                                    )}
                                </CldUploadWidget>
                            </div>

							{/* Image Preview Grid */}
							<div className="grid grid-cols-2 gap-3">
								{uploadedImages.map((imageUrl, index) => (
									<div key={index} className="relative group">
										<img
											src={imageUrl}
											alt={`Imagen ${index + 1}`}
											className="w-full h-24 object-cover rounded-lg"
										/>
										<button
											type="button"
											onClick={() => removeImage(index)}
											className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
										>
											<X size={16} />
										</button>
									</div>
								))}
							</div>

                            {uploadedImages.length < 4 && (
                                <>
                                    <div className="mt-3 text-center">
                                        <p className="text-sm text-red-500">
                                            {4 - uploadedImages.length} imágenes más requeridas
                                        </p>
                                    </div>

                                    {errors.imageUrls && (
                                        <p className="mt-2 text-sm text-red-500 text-center">
                                            {errors.imageUrls.message}
                                        </p>
                                    )}
                                </>
                            )}
						</div>

						{/* Form Summary */}
						<div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 transition-colors">
							<h3 className="text-lg font-semibold mb-3">
								Resumen
							</h3>
							<div className="space-y-2 text-sm">
								<div className="flex justify-between">
									<span className="text-zinc-600 dark:text-zinc-400">
										Imágenes:
									</span>
									<span
										className={
											uploadedImages.length >= 4
												? "text-green-500"
												: "text-red-500"
										}
									>
										{uploadedImages.length}/4
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-zinc-600 dark:text-zinc-400">
										Precio:
									</span>
									<span>
										{watch("price")
											? `${watch("price")} UF`
											: "No especificado"}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-zinc-600 dark:text-zinc-400">
										Tipo:
									</span>
									<span className="capitalize">
										{watch("type") || "No especificado"}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Submit Button - Full Width */}
					<div className="lg:col-span-3 flex justify-start mt-6">
						<button
							onClick={handleSubmit(onSubmit)}
							disabled={isSubmitting}
							className="group bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-800 bg-[length:200%_200%] 
                                    bg-[position:0%_50%] hover:bg-[position:100%_50%] transition-all duration-500 
                                    px-12 py-4 rounded-md flex items-center gap-2 text-white"
						>
							{isSubmitting ? (
								<>
									<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
									Creando Propiedad...
								</>
							) : (
								<>
									<Plus size={20} />
									Registrar Propiedad
								</>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
