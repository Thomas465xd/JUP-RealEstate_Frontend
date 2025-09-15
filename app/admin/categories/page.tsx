import CategoriesTable from "@/components/admin/categories/CategoriesTable";
import Heading from "@/components/utility/Heading";
import { PencilRuler, Tag } from "lucide-react";
import Link from "next/link";

export default function page() {
    return (
        <section className="bg-zinc-100 dark:bg-zinc-900 p-20">
            <Heading
                size="2xl"
                font="bold"
            >
                Administración de Categorías
            </Heading>

            <div className="flex justify-between items-center ">
                <p className="dark:text-zinc-300">
                    Maneja y Ordena todas tus Categorías Registradas
                </p>

                <Link
                    href={"/admin/categories/create"}
                    className="group button-zinc-gradient"
                >
                    <Tag size={20} />
                    Crear Categoría
                </Link>

            </div>

            <div className="border-2 border-zinc-800 dark:border-zinc-300 my-4 rounded max-w-2xl"></div>

            <CategoriesTable />
        </section>
    )
}
