"use client";
import { Fragment, useState } from "react";
import { CategoryPopulated } from "@/src/types";
import { copyToClipboard } from "@/src/utils/copy";
import {
	Folder,
	Search,
	ChevronDown,
	ChevronUp,
	Clipboard,
	AlertCircle,
	Info,
	Calendar,
	Eye,
	Trash2,
	Pen,
	Tag,
	Image,
	Link2,
	CheckCircle,
	XCircle,
	Hash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Swal, { SweetAlertTheme } from "sweetalert2";
import { toast } from "react-toastify";
import Loader from "../../utility/Loader";
import { getPopulatedCategories, deleteCategory } from "@/src/api/FeaturedAPI";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "@/src/utils/date";
import Dialog from "../../utility/Dialog";

// Status info for categories
const getStatusInfo = (isActive: boolean) => {
	return isActive
		? { label: 'Activa', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300', icon: CheckCircle }
		: { label: 'Inactiva', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300', icon: XCircle };
};

export default function CategoriesTable() {
	// Router
	const router = useRouter();
	const queryClient = useQueryClient();

	// State for Search term
	const [searchTerm, setSearchTerm] = useState("");

	// State for expanded rows
	const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

	// Get categories
	const { data, isLoading, isError } = useQuery({
		queryKey: ["categories"],
		queryFn: () => getPopulatedCategories({ page: 1, perPage: 15 }),
		retry: false
	});

	const categories = data?.categories || [];

	// Delete category mutation
	const deleteCategoryMutation = useMutation({
		mutationFn: (categoryId: string) => deleteCategory(categoryId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			toast.success("Categoría eliminada exitosamente");
		},
		onError: (error) => {
			toast.error(error.message || "Error al eliminar la categoría");
		}
	});

	if (isError) {
		return (
			<div className="flex items-center justify-center py-8">
				<div className="text-center">
					<AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
					<p className="text-zinc-600 dark:text-zinc-400">Error al cargar las categorías</p>
				</div>
			</div>
		);
	}

	if (isLoading) return <Loader />;

	// Filter Categories based on search term
	const filteredCategories = categories.filter(
		(category: CategoryPopulated) =>
			category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			category.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
			category._id.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Toggle row expansion
	const toggleRowExpansion = (categoryId: CategoryPopulated["_id"]) => {
		setExpandedRows(prev => ({
			...prev,
			[categoryId]: !prev[categoryId]
		}));
	};

	// Handle delete category
	const handleDeleteCategory = async (id: string, name: string) => {
		try {
			Swal.fire({
				title: "¿Estás seguro?",
				text: `Se eliminará la categoría: "${name}"`,
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Sí, eliminar",
				cancelButtonText: "Cancelar",
				theme: `${localStorage.getItem("theme") as SweetAlertTheme}`
			}).then(async (result) => {
				if (result.isConfirmed) {
					deleteCategoryMutation.mutate(id);
					Swal.fire({
						title: "¡Eliminada!",
						text: "La categoría ha sido eliminada.",
						icon: "success",
						theme: `${localStorage.getItem("theme") as SweetAlertTheme}`
					});
				}
			});
		} catch {
			toast.error("Error al eliminar la categoría");
		}
	};

	return (
		<div className="overflow-hidden rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 mt-12">
			{/* Search bar */}
			<div className="bg-white dark:bg-zinc-800 p-4 border-b border-zinc-200 dark:border-zinc-700">
				<div className="relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<Search size={18} className="text-zinc-400" />
					</div>
					<input
						type="text"
						placeholder="Buscar categorías por nombre, slug o ID..."
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
									<Folder size={16} />
									<span>Categoría</span>
								</div>
							</th>
							<th className="px-6 py-4 font-medium">
								<div className="flex items-center gap-2">
									<Link2 size={16} />
									<span>Slug</span>
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
									<Image size={16} />
									<span>Propiedades</span>
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
						{filteredCategories.length > 0 ? (
							filteredCategories.map((category: CategoryPopulated) => (
								<Fragment key={category._id}>
									<tr
										key={`row-${category._id}`}
										className="hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors duration-300 cursor-pointer"
									>
										<td 
											className="px-3 py-4 text-center"
											onClick={() => toggleRowExpansion(category._id)}
										>
											{expandedRows[category._id] ? (
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
													{category.name}
												</span>
												<button
													onClick={() => copyToClipboard(category.name)}
													className="text-zinc-400 hover:text-blue-500 transition-colors duration-200 group relative"
													title="Copiar nombre"
												>
													<Dialog position="right-top">Copiar</Dialog>
													<Clipboard size={14} />
												</button>
											</div>
										</td>
										
										<td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-300 whitespace-nowrap">
											<div className="flex items-center gap-2">
												<Tag size={14} className="text-zinc-400" />
												<span className="font-mono">{category.slug}</span>
											</div>
										</td>
										
										<td className="px-6 py-4 text-sm whitespace-nowrap">
											{(() => {
												const statusInfo = getStatusInfo(category.isActive);
												const StatusIcon = statusInfo.icon;
												return (
													<span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${statusInfo.color}`}>
														<StatusIcon size={12} />
														{statusInfo.label}
													</span>
												);
											})()}
										</td>
										
										<td className="px-6 py-4 text-sm text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
											<div className="flex items-center gap-2">
												{category.properties.length > 0 ? (
													<>
														<div className="flex -space-x-1">
															{category.properties.slice(0, 3).map((property, index) => (
																<img
																	key={property._id}
																	src={property.imageUrls[0]}
																	alt={`Propiedad ${index + 1}`}
																	className="w-8 h-8 object-cover rounded-full border-2 border-white dark:border-zinc-800"
																/>
															))}
														</div>
														<span className="text-blue-600 dark:text-blue-400 font-medium">
															{category.properties.length}
														</span>
													</>
												) : (
													<span className="text-zinc-400 text-xs">Sin propiedades</span>
												)}
											</div>
										</td>
										
										<td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-700">
											<div className="flex items-center gap-3">
												<button 
													className="text-blue-500 hover:text-blue-700 transition-colors duration-300 flex items-center gap-1"
													onClick={() => router.push(`/home/categories/${category._id}`)}
													title="Ver categoría"
												>
													<Eye size={14} />
													Ver
												</button>

												<button 
													className="text-green-600 hover:text-green-800 transition-colors duration-300 flex items-center gap-1"
													onClick={() => router.push(`/admin/categories/edit/${category._id}`)}
													title="Editar categoría"
												>
													<Pen size={14} />
													Editar
												</button>

												<button 
													className="text-red-700 hover:text-red-900 transition-colors duration-300 flex items-center gap-1"
													onClick={() => handleDeleteCategory(category._id, category.name)}
													title="Eliminar categoría"
													disabled={deleteCategoryMutation.isPending}
												>
													<Trash2 size={14} />
													Eliminar
												</button>
											</div>
										</td>
									</tr>
									
									{/* Expanded Details Row */}
									{expandedRows[category._id] && (
										<tr
											key={`details-${category._id}`}
											className="bg-zinc-50 dark:bg-zinc-700/50"
										>
											<td colSpan={6} className="px-6 py-4">
												<div className="flex items-start gap-2 text-sm">
													<Info size={18} className="text-zinc-400 mt-0.5" />
													<div className="space-y-4 w-full">
														<div className="flex flex-col">
															<span className="text-xs text-zinc-500 dark:text-zinc-400">
																ID de Categoría:
															</span>
															<div className="flex items-center">
																<span className="font-mono text-zinc-800 dark:text-zinc-200 mr-2">
																	{category._id}
																</span>
																<button
																	title="Copiar ID"
																	onClick={() => copyToClipboard(category._id)}
																	className="text-zinc-400 hover:text-blue-500 transition-colors duration-200"
																>
																	<Clipboard size={14} />
																</button>
															</div>
														</div>

														<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
															<div>
																<span className="text-xs text-zinc-500 dark:text-zinc-400">
																	Nombre Completo:
																</span>
																<p className="font-medium text-zinc-800 dark:text-zinc-200">
																	{category.name}
																</p>
															</div>

															<div>
																<span className="text-xs text-zinc-500 dark:text-zinc-400">
																	Slug URL:
																</span>
																<p className="font-mono text-zinc-800 dark:text-zinc-200">
																	{category.slug}
																</p>
															</div>

															<div>
																<span className="text-xs text-zinc-500 dark:text-zinc-400">
																	Estado:
																</span>
																<p className="font-medium text-zinc-800 dark:text-zinc-200">
																	{category.isActive ? 'Activa' : 'Inactiva'}
																</p>
															</div>

															<div>
																<span className="text-xs text-zinc-500 dark:text-zinc-400">
																	Total Propiedades:
																</span>
																<div className="flex items-center gap-1">
																	<Hash size={16} className="text-zinc-500" />
																	<span className="font-medium text-zinc-800 dark:text-zinc-200">
																		{category.properties.length}
																	</span>
																</div>
															</div>
														</div>

														<div className="grid grid-cols-2 gap-4">
															<div>
																<span className="text-xs text-zinc-500 dark:text-zinc-400">
																	Creado:
																</span>
																<div className="flex items-center gap-1">
																	<Calendar size={16} className="text-zinc-500" />
																	<span className="font-medium text-zinc-800 dark:text-zinc-200">
																		{formatDate(category.createdAt)}
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
																		{formatDate(category.updatedAt)}
																	</span>
																</div>
															</div>
														</div>

														{category.properties.length > 0 && (
															<div>
																<span className="text-xs text-zinc-500 dark:text-zinc-400">
																	Propiedades Asignadas ({category.properties.length}):
																</span>
																<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
																	{category.properties.slice(0, 6).map((property) => (
																		<div
																			key={property._id}
																			className="flex items-center gap-2 p-2 bg-white dark:bg-zinc-600 rounded-lg border border-zinc-200 dark:border-zinc-500"
																		>
																			<img
																				src={property.imageUrls[0]}
																				alt={property.title}
																				className="w-10 h-10 object-cover rounded border border-zinc-200 dark:border-zinc-500"
																			/>
																			<div className="flex-1 min-w-0">
																				<p className="text-xs font-medium text-zinc-800 dark:text-zinc-200 truncate">
																					{property.title}
																				</p>
																				<p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
																					{property.cityArea}
																				</p>
																			</div>
																		</div>
																	))}
																	{category.properties.length > 6 && (
																		<div className="flex items-center justify-center p-2 bg-zinc-100 dark:bg-zinc-600 rounded-lg border border-zinc-200 dark:border-zinc-500">
																			<span className="text-xs text-zinc-500 dark:text-zinc-400">
																				+{category.properties.length - 6} más
																			</span>
																		</div>
																	)}
																</div>
															</div>
														)}
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
									colSpan={6}
									className="px-6 py-8 text-center text-zinc-500 dark:text-zinc-400"
								>
									No se encontraron categorías
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Table footer with count */}
			<div className="bg-zinc-50 dark:bg-zinc-800 px-6 py-3 border-t border-zinc-200 dark:border-zinc-700">
				<p className="text-xs text-zinc-500 dark:text-zinc-400">
					Mostrando {filteredCategories.length} de {categories.length} categorías
				</p>
			</div>
		</div>
	);
}