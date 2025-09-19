"use client"

import { useSignUp } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { useState } from "react"

interface GoogleSignUpProps {
  onSuccess?: () => void
}

export function GoogleSignUp({ onSuccess }: GoogleSignUpProps) {
  const { signUp } = useSignUp()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignUp = async () => {
    if (!signUp) return

    setIsLoading(true)
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sign-up/sso-callback",
        redirectUrlComplete: "/",
      })
      onSuccess?.()
    } catch (error) {
      console.error("Google sign-up error:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-black border border-gray-800 rounded-lg p-8 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{t.auth.signUp}</h2>
        <p className="text-gray-400">{t.auth.createAccountWithGoogle}</p>
      </div>

      <Button
        onClick={handleGoogleSignUp}
        disabled={isLoading}
        className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-3"
      >
        <span>{isLoading ? t.auth.creatingAccount : t.auth.continueWithGoogle}</span>
      </Button>
    </div>
  )
}
