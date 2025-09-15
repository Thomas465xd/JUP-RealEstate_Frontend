import PropertyTable from "@/components/admin/properties/PropertyTable";
import Heading from "@/components/utility/Heading";
import { getUF } from "@/lib/uf";
import { House, PencilRuler } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Panel de Administración"
}

export default async function page() {
    const ufValue = await getUF(); // Fetch once per request

    return (
        <section className="bg-zinc-100 dark:bg-zinc-900 p-20">
            <Heading
                size="2xl"
                font="bold"
            >
                Panel de Administración
            </Heading>

            <div className="flex justify-between items-center ">
                <p className="dark:text-zinc-300">
                    Administra todas tus propiedades registradas  
                </p>

                <Link
                    href={"/admin/create"}
                    className="button-zinc-gradient"
                >
                    <PencilRuler size={20} />
                    Crear Propiedad
                </Link>

            </div>

            <div className="border-2 border-zinc-800 dark:border-zinc-300 my-4 rounded max-w-2xl"></div>


            <PropertyTable
                ufValue={ufValue}
            />
        </section>
    )
}



// export default async function AdminDashboard(params: {
// 	searchParams: Promise<{ search?: string }>;
// }) {
// 	if (!checkRole("admin")) {
// 		redirect("/");
// 	}

// 	const query = (await params.searchParams).search;

// 	const client = await clerkClient();

// 	const users = query ? (await client.users.getUserList({ query })).data : [];

// 	return (
//         <>
//             <div className="flex flex-col gap-4 items-center justify-center min-h-screen p-4">

//                 <SearchUsers />

//                 {users.map((user) => {
//                     return (
//                         <div key={user.id}>
//                             <div>
//                                 {user.firstName} {user.lastName}
//                             </div>

//                             <div>
//                                 {
//                                     user.emailAddresses.find(
//                                         (email) =>
//                                             email.id === user.primaryEmailAddressId
//                                     )?.emailAddress
//                                 }
//                             </div>

//                             <div>{user.publicMetadata.role as string}</div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </>
// 	);
// }
