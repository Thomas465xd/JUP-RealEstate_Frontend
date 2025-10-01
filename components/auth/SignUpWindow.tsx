import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInWindow() {
	return (
		<div
			className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
		>
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

            <div className="my-10">
                <SignUp
                    appearance={{
                        elements: {
                            card: "bg-white shadow-lg rounded-lg p-6",
                            formButtonPrimary:
                                "bg-purple-600 hover:bg-purple-700 text-white",
                        },
                    }}
                    redirectUrl="/"
                    signInUrl="/sign-in" // <-- this overrides the default Clerk hosted link
                />
            </div>
		</div>
	);
}
