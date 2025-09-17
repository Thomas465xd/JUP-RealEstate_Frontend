import React from "react";
import { Metadata } from "next";
import EditCategoryForm from "@/components/admin/categories/EditCategoryForm";
import Link from "next/link";
import { ArrowBigLeftIcon, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Editar Categoría"
}

export default async function EditProperty({ params } : { params: Promise<{ categoryId: string }>}) {
    const { categoryId } = await params; 

	return (
        <section className="py-12 dark:bg-zinc-800/30">
            <EditCategoryForm
                categoryId={categoryId}
            />

            <Link
                href="/admin/categories"
                className="max-w-xl w-full mx-auto my-8 button-blue-gradient flex-center"
            >
                <ArrowLeft />   Volver al Panel de administración
            </Link>
        </section>
    );
}
