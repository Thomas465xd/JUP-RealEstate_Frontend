import { toast } from "react-toastify";

// lib/getUF.ts
export async function getUF(): Promise<number> {
    const res = await fetch("https://mindicador.cl/api/uf", {
        next: { revalidate: 86400 }, // cache for 1 day
    });

    if (!res.ok) {
        toast.error("Fallo al obtener valor UF")
        throw new Error("Failed to fetch UF")
    };

    const data = await res.json();
    return data.serie[0].valor; // today's UF in CLP
}
