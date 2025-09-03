"use client"
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from 'next/navigation';
import {
	Search,
	MapPin,
	Home,
	DollarSign,
	Grid,
} from "lucide-react";

interface SearchFormData {
    operation: string;
    propertyType: string;
    region: string;
    cityArea: string;
    currency: string;
    minPrice: string;
    maxPrice: string;
    condo: string;
    searchCode: string;
}

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
	const { register, handleSubmit, watch, setValue, reset } = useForm<SearchFormData>({
		defaultValues: {
			operation: "En Venta",
			propertyType: "",
			region: "",
			cityArea: "",
			currency: "pesos",
			minPrice: "",
			maxPrice: "",
			condo: "true", // for condo parameter
			searchCode: "",
		},
	});

    // Load existing search parameters from URL on component mount
    useEffect(() => {
        const currentParams = new URLSearchParams(searchParams);
        
        // Map URL parameters to form fields
        if (currentParams.get('operation')) setValue('operation', currentParams.get('operation')!);
        if (currentParams.get('type')) setValue('propertyType', currentParams.get('type')!);
        if (currentParams.get('region')) setValue('region', currentParams.get('region')!);
        if (currentParams.get('cityArea')) setValue('cityArea', currentParams.get('cityArea')!);
        if (currentParams.get('minPrice')) setValue('minPrice', currentParams.get('minPrice')!);
        if (currentParams.get('maxPrice')) setValue('maxPrice', currentParams.get('maxPrice')!);
        if (currentParams.get('condo')) setValue('condo', currentParams.get('condo')!);
    }, [searchParams, setValue]);

    const buildSearchUrl = (data: SearchFormData, isCodeSearch: boolean = false) => {
        const params = new URLSearchParams();
        params.set('page', '1'); // Reset to first page on new search

        if (isCodeSearch && data.searchCode.trim()) {
            // For code search, we might want to handle this differently
            // depending on your backend API structure
            params.set('searchCode', data.searchCode.trim());
        } else {
            // Map form data to your API parameters
            if (data.operation && data.operation !== "En Venta") {
                params.set('operation', data.operation);
            }
            
            if (data.propertyType) {
                params.set('type', data.propertyType);
            }
            
            if (data.region) {
                params.set('region', data.region);
            }
            
            if (data.cityArea) {
                params.set('cityArea', data.cityArea);
            }
            
            if (data.minPrice) {
                params.set('minPrice', data.minPrice);
            }
            
            if (data.maxPrice) {
                params.set('maxPrice', data.maxPrice);
            }
            
            if (data.condo) {
                params.set('condo', data.condo);
            }
        }

        return `/home/properties?${params.toString()}`;
    };

    const onSubmit = (data: SearchFormData) => {
        const searchUrl = buildSearchUrl(data, false);
        router.push(searchUrl);
    };

	const onSearchByCode = () => {
		const searchCode = watch("searchCode");
        if (!searchCode.trim()) {
            return; // Don't search with empty code
        }
        
        const data = { ...watch(), searchCode };
        const searchUrl = buildSearchUrl(data, true);
        router.push(searchUrl);
	};

    const clearSearch = () => {
        reset();
        router.push('/home/properties?page=1');
    };

	return (
		<section
			className={`transition-colors duration-300`}
		>
                {/* Search Container */}
                <div className="w-full">
                    <div className="bg-white/95 dark:bg-zinc-800/95 backdrop-blur-sm shadow-xl p-6 md:p-8">
                        {/* Main Search Section */}
                        <div className="space-y-6">
                            {/* First Row - Operation, Property Type, Region, CityArea */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <Home size={16} />
                                        Operación
                                    </label>
                                    <select
                                        {...register("operation")}
                                        className="input"
                                    >
                                        <option value="En Venta">
                                            En Venta
                                        </option>
                                        <option value="En Arriendo">
                                            En Arriendo
                                        </option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <Grid size={16} />
                                        Tipo Propiedad
                                    </label>
                                    <select
                                        {...register("propertyType")}
                                        className="input"
                                    >
                                        <option value="">
                                            Todos los tipos
                                        </option>
                                        <option value="casa">Casa</option>
                                        <option value="departamento">
                                            Departamento
                                        </option>
                                        <option value="oficina">
                                            Oficina
                                        </option>
                                        <option value="local">
                                            Local Comercial
                                        </option>
                                        <option value="terreno">
                                            Terreno
                                        </option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <MapPin size={16} />
                                        Región Metropolitana
                                    </label>
                                    <select
                                        {...register("region")}
                                        className="input"
                                    >
                                        <option value="">
                                            Seleccionar región
                                        </option>
                                        <option value="metropolitana">
                                            Región Metropolitana
                                        </option>
                                        <option value="valparaiso">
                                            Valparaíso
                                        </option>
                                        <option value="biobio">
                                            Biobío
                                        </option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Comuna
                                    </label>
                                    <select
                                        {...register("cityArea")}
                                        className="input"
                                    >
                                        <option value="">
                                            Seleccionar comuna
                                        </option>
                                        <option value="Santiago">
                                            Santiago
                                        </option>
                                        <option value="Providencia">
                                            Providencia
                                        </option>
                                        <option value="Las Condes">
                                            Las Condes
                                        </option>
                                        <option value="Vitacura">
                                            Vitacura
                                        </option>
                                        <option value="Ñunoa">
                                            Ñuñoa
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* Second Row - Currency, Price Range, Condo */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <DollarSign size={16} />
                                        Moneda
                                    </label>
                                    <select
                                        {...register("currency")}
                                        className="input"
                                    >
                                        <option value="pesos">Pesos</option>
                                        <option value="uf">UF</option>
                                        <option value="usd">USD</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Precio Mínimo
                                    </label>
                                    <input
                                        {...register("minPrice")}
                                        type="number"
                                        placeholder="Precio mínimo"
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Precio Máximo
                                    </label>
                                    <input
                                        {...register("maxPrice")}
                                        type="number"
                                        placeholder="Precio máximo"
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Condominio
                                    </label>
                                    <select
                                        {...register("condo")}
                                        className="input"
                                    >
                                        <option value="true">
                                            Si
                                        </option>
                                        <option value="false">
                                            No
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* Search Button */}
                            <div className="flex-center">
                                <button
                                    onClick={handleSubmit(onSubmit)}
                                    className="group button-zinc-gradient"
                                >
                                    <Search size={20} />
                                    BUSCAR
                                </button>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="my-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white dark:bg-zinc-800 text-gray-500 dark:text-gray-400 font-medium">
                                        O buscar por código
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Search by Code */}
                        <div className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="flex-1 space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Código de Propiedad
                                </label>
                                <input
                                    {...register("searchCode")}
                                    type="text"
                                    placeholder="Ingresa el código de la propiedad"
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                            <button
                                onClick={onSearchByCode}
                                className="group button-zinc-gradient"
                            >
                                POR CÓDIGO
                            </button>
                        </div>
                    </div>
                </div>
			
		</section>
	);
}
