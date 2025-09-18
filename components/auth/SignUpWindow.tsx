import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import heroImage from "@/public/hero-image-1.jpg"; // now it's a static import

export default function SignInWindow() {
	return (
		<div
			className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
		>
            <Image
                src={heroImage}
                alt="Hero background"
                fill
                priority
                className="object-cover"
            />

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
