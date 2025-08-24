import PropertyTable from "@/components/admin/PropertyTable";
import Heading from "@/components/utility/Heading";

export default function page() {
    return (
        <section className="bg-zinc-100 dark:bg-zinc-900 p-20">
            <Heading
                size="2xl"
                font="bold"
            >
                Panel de Administración
            </Heading>

            <p className="mb-4 dark:text-zinc-300">
                Administra todas tus propiedades registradas  
            </p>

            <div className="border-2 border-zinc-800 dark:border-zinc-300 my-4 rounded max-w-2xl"></div>

            <PropertyTable />
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
