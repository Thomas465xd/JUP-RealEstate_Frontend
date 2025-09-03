"use client";

import { useUser } from "@clerk/nextjs";

export function useAuth() {
	const { user, isLoaded } = useUser();

	if (!isLoaded) {
		return { role: null, isAdmin: false, isLoading: true };
	}

	// Clerk stores the role in publicMetadata.role
	const role = (user?.publicMetadata?.role as string) || null;

	const isAdmin = role === "admin";

	return { role, isAdmin, isLoading: false };
}
