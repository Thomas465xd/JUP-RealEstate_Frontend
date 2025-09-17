"use client";
import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { 
    Search, 
    X, 
    Plus,
    Loader2,
    AlertCircle,
    Image,
    CheckCircle,
    Home,
    MapPin,
    Building
} from "lucide-react";
import { assignProperties } from "@/src/api/FeaturedAPI";
import { Property } from "@/src/types";
import { formatUF } from "@/src/utils/price";
import { getPropertyByName } from "@/src/api/PropertyAPI";

// Property type icons mapping
const getPropertyIcon = (type: Property["type"]) => {
    const iconMap = {
        casa: Home,
        house: Home,
        departamento: Building,
        apartment: Building,
        parcela: Home,
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

type AssignPropertiesModalProps = {
    categoryId: string;
    currentProperties: string[];
};

export default function AssignPropertiesModal({ 
    categoryId, 
    currentProperties 
}: AssignPropertiesModalProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Search properties query
    const { data: searchData, isLoading: isSearching, isError } = useQuery({
        queryKey: ["searchProperties", debouncedSearchTerm],
        queryFn: () => getPropertyByName(debouncedSearchTerm),
        enabled: debouncedSearchTerm.length >= 2,
        retry: false
    });

    const searchResults = searchData?.properties || [];
    
    // Filter out properties that are already assigned to this category
    const availableProperties = searchResults.filter(
        property => !currentProperties.includes(property._id)
    );

    // Assign properties mutation
    const assignPropertiesMutation = useMutation({
        mutationFn: (propertiesIds: string[]) => 
            assignProperties({ categoryId, propertiesIds }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["category", categoryId] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Propiedades asignadas exitosamente");
            handleClose();
        },
        onError: (error) => {
            toast.error(error.message || "Error al asignar propiedades");
        }
    });

    // Handle modal close
    const handleClose = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('propertiesModal');
        router.replace(`?${params.toString()}`);
    };

    // Handle property selection
    const handlePropertyToggle = (propertyId: string) => {
        setSelectedProperties(prev => 
            prev.includes(propertyId)
                ? prev.filter(id => id !== propertyId)
                : [...prev, propertyId]
        );
    };

    // Handle assign selected properties
    const handleAssignSelected = () => {
        if (selectedProperties.length === 0) {
            toast.warning("Selecciona al menos una propiedad para asignar");
            return;
        }

        assignPropertiesMutation.mutate(selectedProperties);
    };

    // Handle select all visible
    const handleSelectAll = () => {
        const allVisibleIds = availableProperties.map(p => p._id);
        setSelectedProperties(allVisibleIds);
    };

    // Handle clear selection
    const handleClearSelection = () => {
        setSelectedProperties([]);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-700 w-full max-w-4xl max-h-[90vh] flex flex-col">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-700">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                                Asignar Propiedades
                            </h2>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                Busca y selecciona las propiedades que quieres asignar a esta categoría
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                        disabled={assignPropertiesMutation.isPending}
                    >
                        <X className="w-5 h-5 text-zinc-500" />
                    </button>
                </div>

                {/* Search Section */}
                <div className="p-6 border-b border-zinc-200 dark:border-zinc-700">
                    <div className="relative mb-4">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-zinc-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar propiedades por título, dirección o ubicación..."
                            className="block w-full pl-10 pr-3 py-3 border border-zinc-200 dark:border-zinc-600 rounded-lg bg-zinc-50 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            disabled={assignPropertiesMutation.isPending}
                        />
                        {isSearching && (
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <Loader2 className="w-5 h-5 text-zinc-400 animate-spin" />
                            </div>
                        )}
                    </div>

                    {/* Selection Actions */}
                    {availableProperties.length > 0 && (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleSelectAll}
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                    disabled={assignPropertiesMutation.isPending}
                                >
                                    Seleccionar todas ({availableProperties.length})
                                </button>
                                {selectedProperties.length > 0 && (
                                    <button
                                        onClick={handleClearSelection}
                                        className="text-sm text-zinc-600 dark:text-zinc-400 hover:underline"
                                        disabled={assignPropertiesMutation.isPending}
                                    >
                                        Limpiar selección
                                    </button>
                                )}
                            </div>
                            
                            {selectedProperties.length > 0 && (
                                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                    {selectedProperties.length} seleccionadas
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Results Section */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Search Instructions */}
                    {debouncedSearchTerm.length === 0 && (
                        <div className="text-center py-12">
                            <Search className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
                                Busca propiedades para asignar
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Escribe al menos 2 caracteres para comenzar a buscar propiedades disponibles
                            </p>
                        </div>
                    )}

                    {/* Search too short */}
                    {searchTerm.length > 0 && searchTerm.length < 2 && (
                        <div className="text-center py-8">
                            <p className="text-zinc-500 dark:text-zinc-400">
                                Escribe al menos 2 caracteres para buscar...
                            </p>
                        </div>
                    )}

                    {/* Loading */}
                    {isSearching && debouncedSearchTerm.length >= 2 && (
                        <div className="text-center py-8">
                            <Loader2 className="w-8 h-8 text-zinc-400 animate-spin mx-auto mb-2" />
                            <p className="text-zinc-500 dark:text-zinc-400">Buscando propiedades...</p>
                        </div>
                    )}

                    {/* Error */}
                    {isError && debouncedSearchTerm.length >= 2 && (
                        <div className="text-center py-8">
                            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                            <p className="text-red-600 dark:text-red-400">
                                Error al buscar propiedades
                            </p>
                        </div>
                    )}

                    {/* No results */}
                    {!isSearching && !isError && debouncedSearchTerm.length >= 2 && availableProperties.length === 0 && searchResults.length === 0 && (
                        <div className="text-center py-8">
                            <Image className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
                                No se encontraron propiedades
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                No hay propiedades que coincidan con tu búsqueda
                            </p>
                        </div>
                    )}

                    {/* All properties already assigned */}
                    {!isSearching && !isError && debouncedSearchTerm.length >= 2 && availableProperties.length === 0 && searchResults.length > 0 && (
                        <div className="text-center py-8">
                            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
                                Todas las propiedades ya están asignadas
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Las propiedades encontradas ya pertenecen a esta categoría
                            </p>
                        </div>
                    )}

                    {/* Results Grid */}
                    {availableProperties.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {availableProperties.map((property) => (
                                <div
                                    key={property._id}
                                    className={`border rounded-lg p-4 transition-all cursor-pointer hover:shadow-md ${
                                        selectedProperties.includes(property._id)
                                            ? "border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                                            : "border-zinc-200 dark:border-zinc-600 hover:border-zinc-300 dark:hover:border-zinc-500"
                                    }`}
                                    onClick={() => handlePropertyToggle(property._id)}
                                >
                                    {/* Property Header */}
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={selectedProperties.includes(property._id)}
                                                onChange={(e) => {
                                                    e.stopPropagation();
                                                    handlePropertyToggle(property._id);
                                                }}
                                                className="w-4 h-4 text-blue-600 border-zinc-300 dark:border-zinc-600 rounded focus:ring-blue-500"
                                                disabled={assignPropertiesMutation.isPending}
                                            />
                                        </div>
                                        
                                        <img
                                            src={property.imageUrls[0]}
                                            alt={property.title}
                                            className="w-16 h-16 object-cover rounded border border-zinc-200 dark:border-zinc-600"
                                        />
                                        
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-zinc-900 dark:text-white truncate mb-1">
                                                {property.title}
                                            </h4>
                                            <div className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                                                {getPropertyIcon(property.type)}
                                                <span>{getPropertyTypeLabel(property.type)}</span>
                                            </div>
                                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                                {formatUF(property.price)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Property Details */}
                                    <div className="space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            <span className="truncate">{property.address}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Building className="w-3 h-3" />
                                            <span>{property.cityArea}, {property.region}</span>
                                        </div>
                                    </div>

                                    {/* Property Stats */}
                                    <div className="flex items-center gap-4 mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-700">
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                            {property.dorms} dorm
                                        </span>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                            {property.bathrooms} baños
                                        </span>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                            {property.area} m²
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                            {selectedProperties.length > 0 && (
                                <span>
                                    {selectedProperties.length} propiedades seleccionadas para asignar
                                </span>
                            )}
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleClose}
                                disabled={assignPropertiesMutation.isPending}
                                className="px-4 py-2 border border-zinc-200 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancelar
                            </button>
                            
                            <button
                                onClick={handleAssignSelected}
                                disabled={selectedProperties.length === 0 || assignPropertiesMutation.isPending}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:bg-blue-600 text-white rounded-lg transition-colors disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {assignPropertiesMutation.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Asignando...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-4 h-4" />
                                        Asignar Propiedades ({selectedProperties.length})
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}