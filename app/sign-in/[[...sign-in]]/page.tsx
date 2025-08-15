import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-50">
			<SignIn
				appearance={{
					elements: {
						card: "bg-white shadow-lg rounded-lg p-6",
						formButtonPrimary:
							"bg-purple-600 hover:bg-purple-700 text-white",
					},
				}}
				redirectUrl="/dashboard"
			/>
		</div>
	);
}
