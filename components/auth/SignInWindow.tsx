import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInWindow() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center relative bg-zinc-900">
            {/* Add error handling to the image */}
            <div className="absolute inset-0">
                <Image
                    src="/hero-image-1.jpg" // Use public path instead of static import
                    alt="Hero background"
                    fill
                    priority
                    className="object-cover"
                    onError={(e) => {
                        // Fallback if image fails
                        e.currentTarget.style.display = 'none';
                    }}
                />
            </div>

            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10">
                <SignIn
                    appearance={{
                        elements: {
                            card: "bg-white/95 backdrop-blur-sm shadow-2xl rounded-lg p-6",
                            formButtonPrimary:
                                "bg-purple-600 hover:bg-purple-700 text-white",
                        },
                    }}
                    routing="path"
                    path="/sign-in"
                    redirectUrl="/"
                    signUpUrl="/sign-up"
                />
            </div>
        </div>
    );
}