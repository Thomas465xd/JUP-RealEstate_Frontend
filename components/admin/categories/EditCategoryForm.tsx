"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { 
    Folder, 
    Save, 
    AlertCircle, 
    Loader2,
    ArrowLeft,
    Tag,
    CheckCircle,
    XCircle,
    Plus,
    Trash2,
    Image,
    Search
} from "lucide-react";
import { 
    getPopulatedCategory, 
    editCategory, 
    removePropertiesFromCategory 
} from "@/src/api/FeaturedAPI";
import { EditCategoryForm as EditCategoryFormType, CategoryPopulated } from "@/src/types";
import { formatDate } from "@/src/utils/date";
import AssignPropertiesModal from "./AssignPropertiesModal";

type FormData = {
    name: string;
    isActive: boolean;
};

type EditCategoryFormProps = {
    categoryId: string; 
}

export default function EditCategoryForm({ categoryId } : EditCategoryFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    
    const showPropertiesModal = searchParams.get('propertiesModal') === 'true';

    const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty },
        reset,
        watch
    } = useForm<FormData>({
        mode: "onChange"
    });

    const watchedName = watch("name");
    
    // Generate preview slug
    const previewSlug = watchedName
        ? watchedName.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        : "";

    // Get category data
    const { data: categoryData, isLoading, isError } = useQuery({
        queryKey: ["category", categoryId],
        queryFn: () => getPopulatedCategory(categoryId),
        enabled: !!categoryId
    });

    console.log(categoryId)

    const category = categoryData?.category;

    // Populate form when category data loads
    useEffect(() => {
        if (category) {
            reset({
                name: category.name,
                isActive: category.isActive
            });
        }
    }, [category, reset]);

    // Edit category mutation
    const editCategoryMutation = useMutation({
        mutationFn: (data: EditCategoryFormType) => editCategory({ categoryId, formData: data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["category", categoryId] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Categoría actualizada exitosamente");
        },
        onError: (error) => {
            toast.error(error.message || "Error al actualizar la categoría");
        }
    });

    // Remove properties mutation
    const removePropertiesMutation = useMutation({
        mutationFn: (propertiesIds: string[]) => 
            removePropertiesFromCategory({ categoryId, propertiesIds }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["category", categoryId] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Propiedades eliminadas de la categoría");
            setSelectedProperties([]);
        },
        onError: (error) => {
            toast.error(error.message || "Error al eliminar propiedades");
        }
    });

    // Handle form submission
    const onSubmit = (data: FormData) => {
        const categoryData: EditCategoryFormType = {
            name: data.name.trim(),
            slug: previewSlug,
            isActive: data.isActive,
            properties: category?.properties.map(p => ({ _id: p._id })) || []
        };
        
        editCategoryMutation.mutate(categoryData);
    };

    // Handle back navigation
    const handleBack = () => {
        router.push('/admin/categories');
    };

    // Handle property selection for removal
    const handlePropertyToggle = (propertyId: string) => {
        setSelectedProperties(prev => 
            prev.includes(propertyId)
                ? prev.filter(id => id !== propertyId)
                : [...prev, propertyId]
        );
    };

    // Handle remove selected properties
    const handleRemoveSelected = () => {
        if (selectedProperties.length === 0) return;

        removePropertiesMutation.mutate(selectedProperties);
    };

    // Handle open properties modal
    const handleOpenPropertiesModal = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('propertiesModal', 'true');
        router.push(`?${params.toString()}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (isError || !category) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="text-zinc-600 dark:text-zinc-400">Error al cargar la categoría</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver a Categorías
                    </button>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <Folder className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                                Editar Categoría
                            </h1>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Modifica la información y gestiona las propiedades de la categoría
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form Card */}
                    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                        <div className="p-6 border-b border-zinc-200 dark:border-zinc-700">
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                Información General
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                            {/* Category Name Field */}
                            <div className="space-y-2">
                                <label 
                                    htmlFor="name" 
                                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                                >
                                    Nombre de la Categoría *
                                </label>
                                <div className="relative">
                                    <input
                                        {...register("name", {
                                            required: "El nombre de la categoría es obligatorio",
                                            minLength: {
                                                value: 3,
                                                message: "El nombre debe tener al menos 3 caracteres"
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: "El nombre no puede exceder 50 caracteres"
                                            }
                                        })}
                                        type="text"
                                        id="name"
                                        className={`w-full px-4 py-3 border rounded-lg bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                            errors.name 
                                                ? "border-red-300 dark:border-red-600" 
                                                : "border-zinc-200 dark:border-zinc-600"
                                        }`}
                                        disabled={editCategoryMutation.isPending}
                                    />
                                    {errors.name && (
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                            <AlertCircle className="w-5 h-5 text-red-500" />
                                        </div>
                                    )}
                                </div>
                                {errors.name && (
                                    <p className="text-sm text-red-600 dark:text-red-400">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Status Toggle */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Estado de la Categoría
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        {...register("isActive")}
                                        type="checkbox"
                                        id="isActive"
                                        className="w-4 h-4 text-blue-600 border-zinc-300 dark:border-zinc-600 rounded focus:ring-blue-500"
                                        disabled={editCategoryMutation.isPending}
                                    />
                                    <label htmlFor="isActive" className="text-sm text-zinc-700 dark:text-zinc-300">
                                        Categoría activa
                                    </label>
                                    {watch("isActive") ? (
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <XCircle className="w-4 h-4 text-red-500" />
                                    )}
                                </div>
                            </div>

                            {/* URL Preview */}
                            {previewSlug && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                    <div className="flex items-start gap-2">
                                        <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                                        <div>
                                            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                                                Vista previa de la URL
                                            </h4>
                                            <p className="text-sm text-blue-700 dark:text-blue-300 font-mono bg-white dark:bg-zinc-800 px-2 py-1 rounded border">
                                                /featured/{previewSlug}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Category Info */}
                            <div className="bg-zinc-50 dark:bg-zinc-700/50 rounded-lg p-4 space-y-2">
                                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                    <p>ID: {category._id}</p>
                                    <p>Creado: {formatDate(category.createdAt)}</p>
                                    <p>Actualizado: {formatDate(category.updatedAt)}</p>
                                </div>
                            </div>

                            {/* Save Button */}
                            <button
                                type="submit"
                                disabled={!isValid || !isDirty || editCategoryMutation.isPending}
                                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {editCategoryMutation.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Guardando...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Guardar Cambios
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Properties Management Card */}
                    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                        <div className="p-6 border-b border-zinc-200 dark:border-zinc-700">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                    Propiedades Asignadas ({category.properties.length})
                                </h2>
                                <button
                                    onClick={handleOpenPropertiesModal}
                                    className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Asignar
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            {category.properties.length > 0 ? (
                                <div className="space-y-4">
                                    {/* Bulk Actions */}
                                    {selectedProperties.length > 0 && (
                                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-red-700 dark:text-red-300">
                                                    {selectedProperties.length} propiedades seleccionadas
                                                </span>
                                                <button
                                                    onClick={handleRemoveSelected}
                                                    disabled={removePropertiesMutation.isPending}
                                                    className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm disabled:opacity-50"
                                                >
                                                    {removePropertiesMutation.isPending ? (
                                                        <Loader2 className="w-3 h-3 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-3 h-3" />
                                                    )}
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Properties List */}
                                    <div className="space-y-3 max-h-96 overflow-y-auto">
                                        {category.properties.map((property) => (
                                            <div
                                                key={property._id}
                                                className={`flex items-center gap-3 p-3 border rounded-lg transition-colors ${
                                                    selectedProperties.includes(property._id)
                                                        ? "border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20"
                                                        : "border-zinc-200 dark:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedProperties.includes(property._id)}
                                                    onChange={() => handlePropertyToggle(property._id)}
                                                    className="w-4 h-4 text-red-600 border-zinc-300 dark:border-zinc-600 rounded focus:ring-red-500"
                                                />
                                                
                                                <img
                                                    src={property.imageUrls[0]}
                                                    alt={property.title}
                                                    className="w-12 h-12 object-cover rounded border border-zinc-200 dark:border-zinc-600"
                                                />
                                                
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                                                        {property.title}
                                                    </p>
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                                                        {property.address}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Image className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                                    <p className="text-zinc-500 dark:text-zinc-400 mb-4">
                                        No hay propiedades asignadas a esta categoría
                                    </p>
                                    <button
                                        onClick={handleOpenPropertiesModal}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors mx-auto"
                                    >
                                        <Search className="w-4 h-4" />
                                        Buscar Propiedades
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Properties Modal */}
            {showPropertiesModal && (
                <AssignPropertiesModal 
                    categoryId={categoryId}
                    currentProperties={category.properties.map(p => p._id)}
                />
            )}
        </>
    );
}