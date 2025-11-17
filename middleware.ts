// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
    "/sign-in(.*)", 
    "/sign-up(.*)", 
    "/home(.*)",
    "/api/webhooks(.*)",
    "/",
]);

const isAdminRoute = createRouteMatcher([
    '/admin(.*)'
])

export default clerkMiddleware(async (auth, req) => {
    // IMPORTANT: Check public routes FIRST before doing ANY auth operations
    if (isPublicRoute(req)) {
        return NextResponse.next();
    }

    // Only now get auth info for protected routes
    const { sessionClaims, userId } = await auth();
    
    // Protect admin routes with specific logic
    if (isAdminRoute(req)) {
        if (!userId || sessionClaims?.metadata?.role !== 'admin') {
            return NextResponse.redirect(new URL('/', req.url));
        }
        return NextResponse.next(); // Explicitly allow admin access
    }

    // Protect all other non-public routes
    await auth.protect();
    
    return NextResponse.next(); // Explicitly allow authenticated users
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};