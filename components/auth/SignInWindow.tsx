import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import heroImage from "@/public/hero-image.jpg"; // static import

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

			<div className="relative z-10">
				<SignIn
					appearance={{
						elements: {
							card: "bg-white/95 backdrop-blur-sm shadow-2xl rounded-lg p-6",
							formButtonPrimary:
								"bg-purple-600 hover:bg-purple-700 text-white",
						},
					}}
					redirectUrl="/dashboard"
					signUpUrl="/sign-up"
				/>
			</div>
		</div>
	);
}
