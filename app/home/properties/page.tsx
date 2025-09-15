"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import PropertyListing from "@/components/properties/PropertyList";
import SearchBar from "@/components/home/SearchBar";
import Pagination from "@/components/utility/Pagination";
import { Advanced, AdvancedSearchParams } from "@/src/types";
import { advancedPropertySearch } from "@/src/api/SearchAPI";
import PropertiesSkeleton from "@/components/utility/PropertiesSkeleton";

export default function PropertiesPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const page = parseInt(searchParams.get("page") || "1", 10);

	const perPage = 6;

	const { data, isLoading, isError } = useQuery<Advanced>({
		queryKey: [
			"properties",
			page,
			searchParams.get("status"),
			searchParams.get("type"),
			searchParams.get("operation"),
			searchParams.get("cityArea"),
			searchParams.get("region"),
			searchParams.get("dorms"),
			searchParams.get("bathrooms"),
			searchParams.get("parkingSpaces"),
			searchParams.get("minPrice"),
			searchParams.get("maxPrice"),
			searchParams.get("condo"),
			searchParams.get("sortBy"),
			searchParams.get("sortOrder"),
		],
		queryFn: async () => {
			const apiParams: AdvancedSearchParams = {
				page,
				perPage,
			};

            // Extract and type-safe assign params
            const status = searchParams.get("status");
            if (status) apiParams.status = status as AdvancedSearchParams["status"];

            const type = searchParams.get("type");
            if (type) apiParams.type = type as AdvancedSearchParams["type"];

            const operation = searchParams.get("operation");
            if (operation) apiParams.operation = operation as AdvancedSearchParams["operation"];

            const region = searchParams.get("region");
            if (region) apiParams.region = region as AdvancedSearchParams["region"];

            const cityArea = searchParams.get("cityArea");
            if (cityArea) apiParams.cityArea = cityArea;

            const dorms = searchParams.get("dorms");
            if (dorms) apiParams.dorms = parseInt(dorms);

            const bathrooms = searchParams.get("bathrooms");
            if (bathrooms) apiParams.bathrooms = parseInt(bathrooms);

            const parkingSpaces = searchParams.get("parkingSpaces");
            if (parkingSpaces) apiParams.parkingSpaces = parseInt(parkingSpaces);

            const minPrice = searchParams.get("minPrice");
            if (minPrice) apiParams.minPrice = parseFloat(minPrice);

            const maxPrice = searchParams.get("maxPrice");
            if (maxPrice) apiParams.maxPrice = parseFloat(maxPrice);

            const condo = searchParams.get("condo");
            if (condo) apiParams.condo = condo === "true";

            const sortBy = searchParams.get("sortBy");
            if (sortBy) apiParams.sortBy = sortBy as AdvancedSearchParams["sortBy"];

            const sortOrder = searchParams.get("sortOrder");
            if (sortOrder) apiParams.sortOrder = sortOrder as AdvancedSearchParams["sortOrder"];

            // Call API
            const result = await advancedPropertySearch(apiParams);
			if (!result) {
				// Return an empty result object matching the expected shape
				return {
					totalFilteredProperties: 0,
					totalPages: 0,
					currentPage: page,
					perPage,
					properties: [],
				};
			}
			return result;
		},
		staleTime: 1000 * 60 * 5,
		retry: false,
	});

	const properties = data?.properties || [];
	const totalPages = data?.totalPages || 0;

	// Handle error state
	if (isError) {
		redirect("/404");
	}

	// Handle loading state
	if (isLoading) {
		return (
            <>
                <SearchBar />
                <PropertiesSkeleton />
            </>
        );
	}

	// Handle invalid page number
	if (page > totalPages && totalPages > 0) {
		router.push(`/home/properties?page=${totalPages}`);
	}

	// Main content
	if(data) return (
        <div className="min-h-screen bg-white dark:bg-zinc-900">
            {/* Search Bar Section */}
            <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                <SearchBar />
            </div>

            {/* Main Content */}
            <div className="bg-zinc-50 dark:bg-zinc-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                    {/* Property Listings */}
                    <div className="mb-12">
                        <PropertyListing 
                            properties={properties} 
                            title="Descubre Todas Nuestras Propiedades"
                            subtitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo a quidem odio commodi excepturi ipsam, consectetur quo quaerat, eligendi magni ad minima iusto pariatur animi consequuntur iure odit reprehenderit rem."
                        />
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center">
                            <Pagination
                                route="/home/properties"
                                page={page}
                                totalPages={totalPages}
                                searchParams={searchParams}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
	);
}
