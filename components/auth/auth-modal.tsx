"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { GoogleSignIn } from "./google-sign-in"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "signin"
}

export function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
  const [currentMode, setCurrentMode] = useState<"signin">(mode)

  useEffect(() => {
    setCurrentMode(mode)
  }, [mode])

  const handleSuccess = () => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-transparent border-none p-0">
         <GoogleSignIn onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  )
}
