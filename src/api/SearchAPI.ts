import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { AdvancedSearchParams, advancedSearchResponseSchema } from "../types";

//? Advanced Property Search 
export async function advancedPropertySearch(params: AdvancedSearchParams) {
    try {
        //! Destructure Params
        const { 
            perPage, 
            page, 
            status, 
            type, 
            operation,
            cityArea,
            region, 
            dorms, 
            bathrooms, 
            parkingSpaces,  
            minPrice, 
            maxPrice,
            condo, 
            sortBy,
            sortOrder
        } = params

        // Base URL
        let url = `/search?perPage=${perPage}&page=${page}`;

        //* Conditionally add status if it exists
        if (status) {
            url += `&status=${encodeURIComponent(status)}`;
        }

        //* Conditionally add type if it exists
        if (type) {
            url += `&type=${encodeURIComponent(type)}`;
        }

        //* Conditionally add operation if it exists
        if (operation) {
            url += `&operation=${encodeURIComponent(operation)}`;
        }

        //* Conditionally add cityArea if it exists
        if (cityArea) {
            url += `&cityArea=${encodeURIComponent(cityArea)}`;
        }
        
        //* Conditionally add region if it exists
        if (region) {
            url += `&region=${encodeURIComponent(region)}`;
        }
        
        //* Conditionally add dorms if it exists
        if (dorms) {
            url += `&dorms=${encodeURIComponent(dorms)}`;
        }

        //* Conditionally add bathrooms if it exists
        if (bathrooms) {
            url += `&bathrooms=${encodeURIComponent(bathrooms)}`;
        }

        //* Conditionally add parkingSpaces if it exists
        if (parkingSpaces) {
            url += `&parkingSpaces=${encodeURIComponent(parkingSpaces)}`;
        }


        //* Conditionally add minPrice if it exists
        if (minPrice) {
            url += `&minPrice=${encodeURIComponent(minPrice)}`;
        }

       //* Conditionally add maxPrice if it exists
        if (maxPrice) {
            url += `&maxPrice=${encodeURIComponent(maxPrice)}`;
        }

        //* Conditionally add condo if it exists
        if (condo !== undefined && condo !== null) {
            url += `&condo=${encodeURIComponent(condo)}`;
        }

        //* Conditionally add sortBy if it exists
        if (sortBy) {
            url += `&sortBy=${encodeURIComponent(sortBy)}`;
        }

        //* Conditionally add sortOrder if it exists
        if (sortOrder) {
            url += `&sortOrder=${encodeURIComponent(sortOrder)}`;
        }

        console.log(url)

        const { data } = await api.get(url);
        //console.log(data)
        
        const response = advancedSearchResponseSchema.safeParse(data);
        if(response.success) {
            //console.log("✅ Respuesta exitosa de la API:", response.data);
            return response.data;
        }

        console.error("Schema Validation Failed", response.error);
    } catch (error) {
        console.error("❌ Error en la solicitud:", error);

        if (isAxiosError(error)) {
            console.error("🔍 Error de Axios detectado:");
            console.error("➡️ Código de estado:", error.response?.status);
            console.error("➡️ Mensaje de error:", error.response?.data?.error || error.message);
            console.error("➡️ Respuesta completa:", error.response?.data);

            // Lanzamos un error más detallado para que pueda ser manejado correctamente
            throw new Error(error.response?.data?.message || "Ocurrió un error en la API");
        } else {
            console.error("⚠️ Error desconocido:", error);
            throw new Error("Error inesperado. Intenta nuevamente. Si el error persiste, contacta al administrador.");
        }
    }
}