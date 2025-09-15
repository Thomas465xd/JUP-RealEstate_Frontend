"use client";
import { getPopulatedCategories } from "@/src/api/FeaturedAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CategoriesTable() {
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
        queryFn: () => getPopulatedCategories({ page: 1, perPage: 15 }), // Increased for admin table
        retry: false
    });

    const categories = data?.categories || [];
    return (
        <div>CategoriesTable</div>
    )
}
