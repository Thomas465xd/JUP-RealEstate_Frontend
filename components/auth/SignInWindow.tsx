import { SignIn } from "@clerk/nextjs";

export default function SignInWindow() {
    return (
        <SignIn
            appearance={{
                elements: {
                    card: "bg-white shadow-lg rounded-lg p-6",
                    formButtonPrimary:
                        "bg-purple-600 hover:bg-purple-700 text-white",
                },
            }}
            redirectUrl="/dashboard"
            signUpUrl="/sign-up" // <-- this overrides the default Clerk hosted link
        />
    )
}
