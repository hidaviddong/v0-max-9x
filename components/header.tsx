"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { MARKET_PLACE_URL } from "@/lib/constants"
import { useUser } from "@clerk/nextjs"
import { AuthModal } from "@/components/auth/auth-modal"
import { SignOutButton } from "@/components/auth/sign-out-button"
import Link from "next/link"
import Image from "next/image"

export function Header() {
  const { t } = useLanguage()
  const { isSignedIn, user } = useUser()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState("signin")

  const handleSignInClick = () => {
    setAuthMode("signin")
    setAuthModalOpen(true)
  }

  return (
    <>
      <header className="border-b border-gray-800 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <Image
                src="https://vobile-apps.oss-cn-hangzhou.aliyuncs.com/apollo/siteLogo.svg"
                alt="Vobile Logo"
                width={100}
                height={100}
              />
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-gray-300 transition-colors">
                {t.nav.home}
              </Link>
              <Link href="/creator" className="text-gray-300 hover:text-white transition-colors">
                {t.nav.creator}
              </Link>
              <Link href="/asset" className="text-gray-300 hover:text-white transition-colors">
                {t.nav.asset}
              </Link>
              <Link href="/data-bridge" className="text-gray-300 hover:text-white transition-colors">
                {t.nav.dataBridge}
              </Link>
              <a
                href={MARKET_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                {t.nav.marketPlace}
              </a>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {!isSignedIn ? (
                <>
                  <Button variant="secondary" className="flex items-center space-x-1 text-white bg-black hover:bg-black" onClick={handleSignInClick}>
                    {t.nav.signIn}
                  </Button>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-300 text-sm">
                    {t.auth.welcome}, {user?.firstName || user?.username}
                  </span>
                  <SignOutButton />
                </div>
              )}
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} mode={authMode} />
    </>
  )
}
