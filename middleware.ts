// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
    "/sign-in(.*)", 
    "/sign-up(.*)", 
    "/home(.*)",
    "/api/webhooks(.*)", // Add webhook routes if you have them
    "/",
]);

const isAdminRoute = createRouteMatcher([
    '/admin(.*)'
])

export default clerkMiddleware(async (auth, req) => {
    // Allow public routes without authentication
    if (isPublicRoute(req)) {
        return NextResponse.next();
    }

    const { sessionClaims, userId } = await auth();
    
    // Protect admin routes
    if (isAdminRoute(req)) {
        if (!userId || sessionClaims?.metadata?.role !== 'admin') {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    // Protect all other non-public routes
    await auth.protect();
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};