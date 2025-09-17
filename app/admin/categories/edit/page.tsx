import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Editar Categoría"
}

export default function page() {
	return (
        redirect("/admin/categories") // Redirect to the clients page
	);
}