"use client";
import { Fragment, useEffect, useState } from "react";
import { Property } from "@/src/types";
import { copyToClipboard } from "@/src/utils/copy";
import {
	Home,
	MapPin,
	Building,
	Pen,
	Search,
	ChevronDown,
	ChevronUp,
	Clipboard,
	AlertCircle,
	Info,
	Bed,
	Bath,
	Car,
	Maximize,
	Calendar,
	Eye,
	Trash2,
} from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import Swal, { SweetAlertTheme } from "sweetalert2";
import { toast } from "react-toastify";
import Loader from "../utility/Loader";
import { getProperties, deleteProperty } from "@/src/api/PropertyAPI";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatUF, formatUFtoCLP } from "@/src/utils/price";
import { formatDate } from "@/src/utils/date";
import { getUF } from "@/lib/uf";
import Dialog from "../utility/Dialog";

// Property type icons mapping
const getPropertyIcon = (type: Property["type"]) => {
	const iconMap = {
		casa: Home,
		house: Home,
		departamento: Building,
		apartment: Building,
		parcela: Home, // You can replace with a land icon
		land: Home,
		sitio: Home,
		oficina: Building,
		office: Building,
		comercial: Building,
		commercial: Building,
	};
	
	const IconComponent = iconMap[type] || Home;
	return <IconComponent size={16} />;
};

// Property type labels
const getPropertyTypeLabel = (type: Property["type"]) => {
	const labelMap = {
		casa: 'Casa',
		house: 'Casa',
		departamento: 'Departamento',
		apartment: 'Departamento',
		parcela: 'Parcela',
		land: 'Parcela',
		sitio: 'Sitio',
		oficina: 'Oficina',
		office: 'Oficina',
		comercial: 'Comercial',
		commercial: 'Comercial',
	};
	return labelMap[type] || 'Propiedad';
};

// Status labels and colors
const getStatusInfo = (status: Property["status"]) => {
	const statusMap = {
		disponible: { label: 'Disponible', color: 'bg-green-200 text-green-800' },
		available: { label: 'Disponible', color: 'bg-green-200 text-green-800' },
		vendida: { label: 'Vendida', color: 'bg-red-200 text-red-800' },
		sold: { label: 'Vendida', color: 'bg-red-200 text-red-800' },
		pendiente: { label: 'Pendiente', color: 'bg-yellow-200 text-yellow-800' },
		pending: { label: 'Pendiente', color: 'bg-yellow-200 text-yellow-800' },
	};
	return statusMap[status] || statusMap.disponible;
};

type PropertyTableProps = {
    ufValue: number; 
}

export default function PropertyTable({ ufValue } : PropertyTableProps) {
	// Router
	const router = useRouter();
	const queryClient = useQueryClient();

	// State for Search term
	const [searchTerm, setSearchTerm] = useState("");

	// State for expanded rows
	const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

	// Get properties
	const { data, isLoading, isError } = useQuery({
		queryKey: ["properties"],
		queryFn: () => getProperties({ page: 1, perPage: 15 }), // Increased for admin table
		retry: false
	});

	const properties = data?.properties || [];

	// Delete property mutation
	const deletePropertyMutation = useMutation({
		mutationFn: (propertyId: string) => deleteProperty(propertyId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["properties"] });
			toast.success("Propiedad eliminada exitosamente");
		},
		onError: (error: any) => {
			toast.error(error?.message || "Error al eliminar la propiedad");
		}
	});

	if (isError) return redirect("/404");

	if (isLoading) return <Loader />;

	// Filter Properties based on search term
	const filteredProperties = properties.filter(
		(property: Property) =>
			property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
			property._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
			property.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
			property.cityArea.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Toggle row expansion
	const toggleRowExpansion = (propertyId: Property["_id"]) => {
		setExpandedRows(prev => ({
			...prev,
			[propertyId]: !prev[propertyId]
		}));
	};

	// Handle delete property
	const handleDeleteProperty = async (id: string, title: string) => {
		try {
			Swal.fire({
				title: "¿Estás seguro?",
				text: `Se eliminará la propiedad: "${title}"`,
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Sí, eliminar",
				cancelButtonText: "Cancelar",
				theme: `${localStorage.getItem("theme") as SweetAlertTheme}`
			}).then(async (result) => {
				if (result.isConfirmed) {
					deletePropertyMutation.mutate(id);
					Swal.fire({
						title: "¡Eliminada!",
						text: "La propiedad ha sido eliminada.",
						icon: "success",
						theme: `${localStorage.getItem("theme") as SweetAlertTheme}`
					});
				}
			});
		} catch {
			toast.error("Error al eliminar la propiedad");
		}
	};

	return (
		<div className="overflow-hidden rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700">
			{/* Search bar */}
			<div className="bg-white dark:bg-zinc-800 p-4 border-b border-zinc-200 dark:border-zinc-700">
				<div className="relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<Search size={18} className="text-zinc-400" />
					</div>
					<input
						type="text"
						placeholder="Buscar propiedades por título, dirección, región o ID..."
						className="block w-full pl-10 pr-3 py-2 border border-zinc-200 dark:border-zinc-600 rounded-md bg-zinc-50 dark:bg-zinc-700 text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			{/* Table */}
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="bg-gradient-to-r from-zinc-800 to-zinc-700 text-left text-sm text-white">
							<th className="w-8 px-2 py-4"></th>
							<th className="px-6 py-4 font-medium">
								<div className="flex items-center gap-2">
									<Home size={16} />
									<span>Propiedad</span>
								</div>
							</th>
							<th className="px-6 py-4 font-medium">
								<div className="flex items-center gap-2">
									<Building size={16} />
									<span>Tipo</span>
								</div>
							</th>
							<th className="px-6 py-4 font-medium">
								<div className="flex items-center gap-2">
									<MapPin size={16} />
									<span>Ubicación</span>
								</div>
							</th>
							<th className="px-6 py-4 font-medium">
								<div className="flex items-center gap-2">
									<span>$</span>
									<span>Precio (UF)</span>
								</div>
							</th>
							<th className="px-6 py-4 font-medium">
								<div className="flex items-center gap-2">
									<AlertCircle size={16} />
									<span>Estado</span>
								</div>
							</th>
							<th className="px-6 py-4 font-medium">
								<div className="flex items-center gap-2">
									<Pen size={16} />
									<span>Acciones</span>
								</div>
							</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-zinc-200 dark:divide-zinc-700 bg-white dark:bg-zinc-800">
						{filteredProperties.length > 0 ? (
							filteredProperties.map((property: Property) => (
								<Fragment key={property._id}>
									<tr
										key={`row-${property._id}`}
										className="hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors duration-300 cursor-pointer"
									>
										<td 
											className="px-3 py-4 text-center"
											onClick={() => toggleRowExpansion(property._id)}
										>
											{expandedRows[property._id] ? (
												<div className="group relative">
													<ChevronUp size={16} className="text-zinc-500" />
													<Dialog position="right-top">Menos Info</Dialog>
												</div>
											) : (
												<div className="group relative">
													<ChevronDown size={16} className="text-zinc-500" />
													<Dialog position="right-top">Más Info</Dialog>
												</div>
											)}
										</td>
										
										<td className="px-6 py-4 text-sm font-medium text-zinc-800 dark:text-zinc-200">
											<div className="flex items-center">
												<span className="mr-2 max-w-48 truncate">
													{property.title}
												</span>
												<button
													onClick={() => copyToClipboard(property.title)}
													className="text-zinc-400 hover:text-blue-500 transition-colors duration-200 group relative"
													title="Copiar título"
												>
													<Dialog position="right-top">Copiar</Dialog>
													<Clipboard size={14} />
												</button>
											</div>
										</td>
										
										<td className="px-6 py-4 text-sm text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
											<div className="flex items-center gap-2">
												{getPropertyIcon(property.type)}
												<span>{getPropertyTypeLabel(property.type)}</span>
											</div>
										</td>
										
										<td className="px-6 py-4 text-sm text-zinc-800 dark:text-zinc-200">
											<div className="max-w-48">
												<div className="truncate font-medium">{property.cityArea}</div>
												<div className="truncate text-xs text-zinc-500">{property.region}</div>
											</div>
										</td>
										
										<td className="px-6 py-4 text-sm font-medium text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
											{formatUF(property.price)}
										</td>
										
										<td className="px-6 py-4 text-sm whitespace-nowrap">
											{(() => {
												const statusInfo = getStatusInfo(property.status);
												return (
													<span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${statusInfo.color}`}>
														{statusInfo.label}
													</span>
												);
											})()}
										</td>
										
										<td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-700">
											<div className="flex items-center gap-3">
												<button 
													className="text-blue-500 hover:text-blue-700 transition-colors duration-300 flex items-center gap-1"
													onClick={() => router.push(`/properties/${property._id}`)}
													title="Ver propiedad"
												>
													<Eye size={14} />
													Ver
												</button>

												<button 
													className="text-green-600 hover:text-green-800 transition-colors duration-300 flex items-center gap-1"
													onClick={() => router.push(`/admin/properties/edit/${property._id}`)}
													title="Editar propiedad"
												>
													<Pen size={14} />
													Editar
												</button>

												<button 
													className="text-red-700 hover:text-red-900 transition-colors duration-300 flex items-center gap-1"
													onClick={() => handleDeleteProperty(property._id, property.title)}
													title="Eliminar propiedad"
													disabled={deletePropertyMutation.isPending}
												>
													<Trash2 size={14} />
													Eliminar
												</button>
											</div>
										</td>
									</tr>
									
									{/* Expanded Details Row */}
									{expandedRows[property._id] && (
										<tr
											key={`details-${property._id}`}
											className="bg-zinc-50 dark:bg-zinc-700/50"
										>
											<td colSpan={7} className="px-6 py-4">
												<div className="flex items-start gap-2 text-sm">
													<Info size={18} className="text-zinc-400 mt-0.5" />
													<div className="space-y-4 w-full">
														<div className="flex flex-col">
															<span className="text-xs text-zinc-500 dark:text-zinc-400">
																ID de Propiedad:
															</span>
															<div className="flex items-center">
																<span className="font-mono text-zinc-800 dark:text-zinc-200 mr-2">
																	{property._id}
																</span>
																<button
																	title="Copiar ID"
																	onClick={() => copyToClipboard(property._id)}
																	className="text-zinc-400 hover:text-blue-500 transition-colors duration-200"
																>
																	<Clipboard size={14} />
																</button>
															</div>
														</div>

														<div>
															<span className="text-xs text-zinc-500 dark:text-zinc-400">
																Descripción:
															</span>
															<p className="text-zinc-800 dark:text-zinc-200 whitespace-normal">
																{property.description || "Sin descripción disponible"}
															</p>
														</div>

														<div>
															<span className="text-xs text-zinc-500 dark:text-zinc-400">
																Dirección Completa:
															</span>
															<p className="text-zinc-800 dark:text-zinc-200">
																{property.address}
															</p>
														</div>

														<div>
															<span className="text-xs text-zinc-500 dark:text-zinc-400">
																Precio en Pesos:
															</span>
															<p className="text-zinc-800 dark:text-zinc-200">
																{formatUFtoCLP(property.price, ufValue)}
															</p>
														</div>

														<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
															<div>
																<span className="text-xs text-zinc-500 dark:text-zinc-400">
																	Dormitorios:
																</span>
																<div className="flex items-center gap-1">
																	<Bed size={16} className="text-zinc-500" />
																	<span className="font-medium text-zinc-800 dark:text-zinc-200">
																		{property.dorms}
																	</span>
																</div>
															</div>

															<div>
																<span className="text-xs text-zinc-500 dark:text-zinc-400">
																	Baños:
																</span>
																<div className="flex items-center gap-1">
																	<Bath size={16} className="text-zinc-500" />
																	<span className="font-medium text-zinc-800 dark:text-zinc-200">
																		{property.bathrooms}
																	</span>
																</div>
															</div>

															<div>
																<span className="text-xs text-zinc-500 dark:text-zinc-400">
																	Estacionamientos:
																</span>
																<div className="flex items-center gap-1">
																	<Car size={16} className="text-zinc-500" />
																	<span className="font-medium text-zinc-800 dark:text-zinc-200">
																		{property.parkingSpaces}
																	</span>
																</div>
															</div>

															<div>
																<span className="text-xs text-zinc-500 dark:text-zinc-400">
																	Superficie:
																</span>
																<div className="flex items-center gap-1">
																	<Maximize size={16} className="text-zinc-500" />
																	<span className="font-medium text-zinc-800 dark:text-zinc-200">
																		{property.area} m²
																	</span>
																</div>
															</div>
														</div>

														<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
															<div>
																<span className="text-xs text-zinc-500 dark:text-zinc-400">
																	Condominio:
																</span>
																<p className="font-medium text-zinc-800 dark:text-zinc-200">
																	{property.condo ? 'Sí' : 'No'}
																</p>
															</div>

															<div>
																<span className="text-xs text-zinc-500 dark:text-zinc-400">
																	Creado:
																</span>
																<div className="flex items-center gap-1">
																	<Calendar size={16} className="text-zinc-500" />
																	<span className="font-medium text-zinc-800 dark:text-zinc-200">
																		{formatDate(property.createdAt)}
																	</span>
																</div>
															</div>

															<div>
																<span className="text-xs text-zinc-500 dark:text-zinc-400">
																	Actualizado:
																</span>
																<div className="flex items-center gap-1">
																	<Calendar size={16} className="text-zinc-500" />
																	<span className="font-medium text-zinc-800 dark:text-zinc-200">
																		{formatDate(property.updatedAt)}
																	</span>
																</div>
															</div>
														</div>

														<div>
															<span className="text-xs text-zinc-500 dark:text-zinc-400">
																Imágenes ({property.imageUrls.length}):
															</span>
															<div className="flex gap-2 mt-1 overflow-x-auto">
																{property.imageUrls.slice(0, 5).map((url, index) => (
																	<img
																		key={index}
																		src={url}
																		alt={`Imagen ${index + 1}`}
																		className="w-16 h-16 object-cover rounded border border-zinc-200 dark:border-zinc-600 flex-shrink-0"
																	/>
																))}
																{property.imageUrls.length > 5 && (
																	<div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-600 rounded border border-zinc-200 dark:border-zinc-600 flex items-center justify-center text-xs text-zinc-500">
																		+{property.imageUrls.length - 5}
																	</div>
																)}
															</div>
														</div>
													</div>
												</div>
											</td>
										</tr>
									)}
								</Fragment>
							))
						) : (
							<tr>
								<td
									colSpan={7}
									className="px-6 py-8 text-center text-zinc-500 dark:text-zinc-400"
								>
									No se encontraron propiedades
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Table footer with count */}
			<div className="bg-zinc-50 dark:bg-zinc-800 px-6 py-3 border-t border-zinc-200 dark:border-zinc-700">
				<p className="text-xs text-zinc-500 dark:text-zinc-400">
					Mostrando {filteredProperties.length} de {properties.length} propiedades
				</p>
			</div>
		</div>
	);
}