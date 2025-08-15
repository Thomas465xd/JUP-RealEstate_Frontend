import { SignUp } from "@clerk/nextjs";

export default function SignInWindow() {
	return (
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
	);
}
