import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { categoriesPopulatedResponseSchema, categoriesResponseSchema, Category, CategoryForm, EditCategoryForm, getCategoryByIdResponseSchema, getCategoryByNameResponseSchema, getCategoryPopulatedByIdResponseSchema } from "../types";

//TODO: Add al Featured Properties methods.
//* Get all registered categories without populated properties, just id's
export async function getCategories({page, perPage} : { page: number, perPage: number}) {
    try {
        const url = `/featured?page=${page}&perPage=${perPage}`;
        const { data } = await api.get(url);

        //console.log("✅ Respuesta exitosa de la API:", response.data);

        const response = categoriesResponseSchema.safeParse(data);
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

//* Get a single category by it's mongo ID without populated properties info
export async function getCategoryById( categoryId : string) {
    try {
        const url = `/featured/${categoryId}`;
        const { data } = await api.get(url);

        //console.log("✅ Respuesta exitosa de la API:", response.data);

        const response = getCategoryByIdResponseSchema.safeParse(data);
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

//* Get all registered categories populated with prooperties info
export async function getPopulatedCategories({page, perPage} : { page: number, perPage: number}) {
    try {
        const url = `/featured/properties?page=${page}&perPage=${perPage}`;
        const { data } = await api.get(url);

        //console.log("✅ Respuesta exitosa de la API:", response.data);

        const response = categoriesPopulatedResponseSchema.safeParse(data);
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

//* Get a single category by it's id with populated properties
export async function getPopulatedCategory(categoryId : string) {
    try {
        const url = `/featured/properties/${categoryId}`;
        const { data } = await api.get(url);

        //console.log("✅ Respuesta exitosa de la API:", response.data);

        const response = getCategoryPopulatedByIdResponseSchema.safeParse(data);
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

//* Get Categories by name (slug) | Allows fuzzy search (slug has to be transformed before sending)
export async function getCateogoriesByName(slug : string) {
    try {
        const url = `/featured/search/${slug}`;
        const { data } = await api.get(url);

        //console.log("✅ Respuesta exitosa de la API:", response.data);

        const response = getCategoryByNameResponseSchema.safeParse(data);
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

//^ Create category (without assigning properties)
export async function createCategory(formData: CategoryForm) {
    try {
        const url = `/featured`;
        console.log(formData);

        // Ensure the request body has the correct structure
        const requestBody = {
            categoryName: formData.name
        };

        const { data } = await api.post(url, requestBody);
        console.log(data);

        return data;
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

//? Edit Category (without changing properties)
export async function editCategory({ categoryId, formData }: {categoryId: string, formData: EditCategoryForm}) {
    try {
        const url = `/featured/${categoryId}`;
        console.log(formData)

        const { data } = await api.patch(url, formData);
        console.log(data)

        //console.log("✅ Respuesta exitosa de la API:", response.data);

        return data;            

        //console.error("Schema Validation Failed", response.error);
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

//! Completely delete registered category
export async function deleteCategory(categoryId: string) {
    try {
        const url = `/featured/${categoryId}`;
        const { data } = await api.delete(url);

        //console.log("✅ Respuesta exitosa de la API:", response.data);

        return data; 
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

//? Assign a single Property to a Category
export async function assignProperty({ categoryId, propertyId }: { categoryId: string, propertyId: string }) {
    try {
        const url = `/featured/properties/${categoryId}`;
        console.log(propertyId);

        // Send the propertyId in the correct format for single assignment
        const requestBody = {
            propertyId
        };

        const { data } = await api.patch(url, requestBody);
        console.log(data);

        return data;
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

//? Bulk Assign Properties to a single category
export async function assignProperties({ categoryId, propertiesIds }: { categoryId: string, propertiesIds: string[] }) {
    try {
        const url = `/featured/properties/${categoryId}/bulk`;
        console.log(propertiesIds);

        // Send the propertiesIds array in the correct format
        const requestBody = {
            propertiesIds
        };

        const { data } = await api.patch(url, requestBody);
        console.log(data);

        return data;
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

//! Remove property from category
export async function removePropertyFromCategory({ categoryId, propertyId }: { categoryId: string, propertyId: string }) {
    try {
        const url = `/featured/properties/${categoryId}`;
        console.log(propertyId);

        // Send the propertyId in the correct format for single assignment
        const requestBody = {
            propertyId
        };

        const { data } = await api.delete(url, { data: requestBody });
        console.log(data);

        return data;
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

//! Remove Multiple Properties from a single category
export async function removePropertiesFromCategory({ categoryId, propertiesIds }: { categoryId: string, propertiesIds: string[] }) {
    try {
        const url = `/featured/properties/${categoryId}/bulk`;
        console.log(propertiesIds);

        // Send the propertiesIds array in the correct format
        const requestBody = {
            propertiesIds
        };

        const { data } = await api.delete(url, { data: requestBody });
        console.log(data);

        return data;
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