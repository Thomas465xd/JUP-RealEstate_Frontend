import { toast } from "react-toastify";

export async function getUF(): Promise<number> {
    const res = await fetch("https://mindicador.cl/api/uf", {
        cache: "no-store", // always fresh
    });

    if (!res.ok) {
        toast.error("Fallo al obtener valor UF")
        throw new Error("Failed to fetch UF")
    };

    const data = await res.json();

    return data.serie[0].valor; // today's UF in CLP
}
