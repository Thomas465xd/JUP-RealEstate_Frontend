
import { redirect } from "next/navigation";
import { SearchUsers } from "@/components/admin/SearchUsers";
import { clerkClient } from "@clerk/nextjs/server";
import { checkRole } from "@/src/utils/roles";
import Hero from "@/components/home/Hero";

export default async function AdminDashboard(params: {
	searchParams: Promise<{ search?: string }>;
}) {
	if (!checkRole("admin")) {
		redirect("/");
	}

	const query = (await params.searchParams).search;

	const client = await clerkClient();

	const users = query ? (await client.users.getUserList({ query })).data : [];

	return (
        <>
            <Hero />
            <div className="flex flex-col gap-4 items-center justify-center min-h-screen p-4">

                <SearchUsers />

                {users.map((user) => {
                    return (
                        <div key={user.id}>
                            <div>
                                {user.firstName} {user.lastName}
                            </div>

                            <div>
                                {
                                    user.emailAddresses.find(
                                        (email) =>
                                            email.id === user.primaryEmailAddressId
                                    )?.emailAddress
                                }
                            </div>

                            <div>{user.publicMetadata.role as string}</div>
                        </div>
                    );
                })}
            </div>
        </>
	);
}
