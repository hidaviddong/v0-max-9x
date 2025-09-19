"use client"

import { useClerk } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { LogOut } from "lucide-react"
import { useState } from "react"

export function SignOutButton() {
  const { signOut } = useClerk()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signOut()
    } catch (error) {
      console.error("Sign out error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleSignOut}
      disabled={isLoading}
      variant="ghost"
      className="text-gray-300 hover:text-white hover:bg-gray-800 flex items-center space-x-2"
    >
      <LogOut className="w-4 h-4" />
      <span>{isLoading ? t.auth.signingOut : t.auth.signOut}</span>
    </Button>
  )
}
