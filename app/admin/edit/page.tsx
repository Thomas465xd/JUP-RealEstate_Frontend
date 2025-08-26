import { redirect } from "next/navigation";

export default function page() {
	return (
        redirect("/admin") // Redirect to the clients page
	);
}