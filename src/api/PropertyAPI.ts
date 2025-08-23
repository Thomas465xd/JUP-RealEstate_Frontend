import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { propertyResponseSchema } from "../types";

export async function getProperties({page, perPage} : { page: number, perPage: number}) {
    try {
        const url = `/properties?page=${page}&perPage=${perPage}`;
        const { data } = await api.get(url);

        //console.log("✅ Respuesta exitosa de la API:", response.data);

        const response = propertyResponseSchema.safeParse(data);
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