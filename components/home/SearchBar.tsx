"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
	Search,
	MapPin,
	Home,
	DollarSign,
	Grid,
	Moon,
	Sun,
} from "lucide-react";

export default function SearchBar() {
	const { register, handleSubmit, watch, setValue } = useForm({
		defaultValues: {
			operation: "en-venta",
			propertyType: "",
			region: "",
			commune: "",
			currency: "pesos",
			minPrice: "",
			maxPrice: "",
			condition: "en-condomi",
			searchCode: "",
		},
	});

    // TODO: Not actual backend data structure
    interface SearchFormData {
        operation: string;
        propertyType: string;
        region: string;
        commune: string;
        currency: string;
        minPrice: string;
        maxPrice: string;
        condition: string;
        searchCode: string;
    }

    const onSubmit = (data: SearchFormData) => {
        console.log("Search data:", data);
        // Handle search logic here
    };

	const onSearchByCode = () => {
		const searchCode = watch("searchCode");
		console.log("Search by code:", searchCode);
		// Handle search by code logic here
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
                            {/* First Row - Operation, Property Type, Region, Commune */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <Home size={16} />
                                        Operación
                                    </label>
                                    <select
                                        {...register("operation")}
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                    >
                                        <option value="en-venta">
                                            En Venta
                                        </option>
                                        <option value="en-arriendo">
                                            En Arriendo
                                        </option>
                                        <option value="vendido">
                                            Vendido
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
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
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
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
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
                                        {...register("commune")}
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                    >
                                        <option value="">
                                            Seleccionar comuna
                                        </option>
                                        <option value="santiago">
                                            Santiago
                                        </option>
                                        <option value="providencia">
                                            Providencia
                                        </option>
                                        <option value="las-condes">
                                            Las Condes
                                        </option>
                                        <option value="vitacura">
                                            Vitacura
                                        </option>
                                        <option value="nunoa">Ñuñoa</option>
                                    </select>
                                </div>
                            </div>

                            {/* Second Row - Currency, Price Range, Condition */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <DollarSign size={16} />
                                        Moneda
                                    </label>
                                    <select
                                        {...register("currency")}
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
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
                                        Condición
                                    </label>
                                    <select
                                        {...register("condition")}
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                    >
                                        <option value="en-condomi">
                                            En Condominio
                                        </option>
                                        <option value="nueva">Nueva</option>
                                        <option value="usada">Usada</option>
                                        <option value="en-construccion">
                                            En Construcción
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* Search Button */}
                            <div className="flex justify-center">
                                <button
                                    onClick={handleSubmit(onSubmit)}
                                    className="group bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-800 bg-[length:200%_200%] 
                                            bg-[position:0%_50%] hover:bg-[position:100%_50%] transition-all duration-500 
                                            px-8 py-2 rounded-md flex items-center gap-2 text-white"
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
                                className="group bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-800 bg-[length:200%_200%] 
                                        bg-[position:0%_50%] hover:bg-[position:100%_50%] transition-all duration-500 
                                        px-8 py-2 rounded-md flex items-center gap-2 text-white"
                            >
                                POR CÓDIGO
                            </button>
                        </div>
                    </div>
                </div>
			
		</section>
	);
}
