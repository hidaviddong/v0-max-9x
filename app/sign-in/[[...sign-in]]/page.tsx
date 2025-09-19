import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-400">Welcome back to Vobile MAX</p>
        </div>
        <SignIn
          appearance={{
            baseTheme: undefined,
            variables: {
              colorPrimary: "#f97316",
              colorBackground: "#000000",
              colorInputBackground: "#1f2937",
              colorInputText: "#ffffff",
              colorText: "#ffffff",
              colorTextSecondary: "#9ca3af",
            },
            elements: {
              formButtonPrimary:
                "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
              card: "bg-black border border-gray-800 shadow-2xl",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-300",
              socialButtonsBlockButton: "border-gray-700 text-white hover:bg-gray-800",
              formFieldLabel: "text-white",
              footerActionLink: "text-orange-500 hover:text-orange-400",
              identityPreviewText: "text-white",
              identityPreviewEditButton: "text-orange-500",
            },
          }}
        />
      </div>
    </div>
  )
}
