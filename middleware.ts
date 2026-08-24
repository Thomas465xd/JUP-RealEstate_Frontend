// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
	// Only admin routes get protected/redirected.
	// Every other route (including sign-in, sign-up, home, api/webhooks,
	// and all normal client routes) passes through untouched.
	if (isAdminRoute(req)) {
		const { userId, sessionClaims } = await auth();

		if (!userId || sessionClaims?.metadata?.role !== "admin") {
			return NextResponse.redirect(new URL("/", req.url));
		}

		return NextResponse.next();
	}

	return NextResponse.next();
});

export const config = {
	matcher: [
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		"/(api|trpc)(.*)",
	],
};
