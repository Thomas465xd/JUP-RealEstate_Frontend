"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { 
    Folder, 
    Plus, 
    AlertCircle, 
    Loader2,
    ArrowRight,
    Tag,
    CheckCircle,
    ArrowLeft
} from "lucide-react";
import { createCategory } from "@/src/api/FeaturedAPI";
import { CategoryForm } from "@/src/types";

type FormData = {
    name: string;
};

export default function CreateCategoryForm() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isSuccess, setIsSuccess] = useState(false);

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty },
        reset,
        watch
    } = useForm<FormData>({
        mode: "onChange",
        defaultValues: {
            name: ""
        }
    });

    const watchedName = watch("name");
    
    // Generate preview slug
    const previewSlug = watchedName
        ? watchedName.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        : "";

    // Create category mutation
    const { mutate, isPending } = useMutation({
        mutationFn: (data: CategoryForm) => createCategory(data),
        onSuccess: (response) => {
            // Invalidate categories query to refresh the list
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            
            setIsSuccess(true);
            toast.success("¡Categoría creada exitosamente!");
            
            // Redirect to edit page after a short delay to show success state
            setTimeout(() => {
                router.push(`/admin/categories/edit/${response.category.id}`);
            }, 1500);
        },
        onError: (error) => {
            toast.error(error.message || "Error al crear la categoría");
        }
    });

    // Handle form submission
    const onSubmit = (data: FormData) => {
        const categoryData: CategoryForm = {
            name: data.name.trim()
        };
        
        mutate(categoryData);
    };

    // Handle cancel
    const handleCancel = () => {
        reset();
        router.back();
    };

    if (isSuccess) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                        ¡Categoría Creada!
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        Redirigiendo al editor para asignar propiedades...
                    </p>
                    <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => router.push("/admin/categories")}
                    className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-4 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver a Categorías
                </button>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                            Crear Nueva Categoría
                        </h1>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Crea una nueva categoría para organizar tus propiedades destacadas
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                <div className="p-6 border-b border-zinc-200 dark:border-zinc-700">
                    <div className="flex items-center gap-2">
                        <Folder className="w-5 h-5 text-zinc-500" />
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                            Información de la Categoría
                        </h2>
                    </div>
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
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9\s\-_áéíóúüñÁÉÍÓÚÜÑ]+$/,
                                        message: "Solo se permiten letras, números, espacios y guiones"
                                    }
                                })}
                                type="text"
                                id="name"
                                placeholder="Ej: Propiedades de Lujo, Casas Familiares, etc."
                                className={`w-full px-4 py-3 border rounded-lg bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                    errors.name 
                                        ? "border-red-300 dark:border-red-600" 
                                        : "border-zinc-200 dark:border-zinc-600"
                                }`}
                                disabled={isPending}
                            />
                            {errors.name && (
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                </div>
                            )}
                        </div>
                        {errors.name && (
                            <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.name.message}
                            </p>
                        )}
                        
                        {/* Character count */}
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 text-right">
                            {watchedName.length}/50 caracteres
                        </p>
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
                                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                        Esta URL se genera automáticamente basada en el nombre
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Info Box */}
                    <div className="bg-zinc-50 dark:bg-zinc-700/50 border border-zinc-200 dark:border-zinc-600 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-zinc-500 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-1">
                                    Siguiente paso
                                </h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Después de crear la categoría serás redirigido al editor donde podrás asignar las propiedades que pertenecen a esta categoría.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isPending}
                            className="px-6 py-3 border border-zinc-200 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancelar
                        </button>
                        
                        <button
                            type="submit"
                            disabled={!isValid || !isDirty || isPending}
                            className="flex-1 sm:flex-none px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Creando Categoría...
                                </>
                            ) : (
                                <>
                                    <span>Crear Categoría</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}