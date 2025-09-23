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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function Header() {
  const { t } = useLanguage()
  const { isSignedIn, user } = useUser()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState("signin")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignInClick = () => {
    setAuthMode("signin")
    setAuthModalOpen(true)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="border-b border-gray-800 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/siteLogo%281%29%281%29-odR4rhCsCr2hAXZQMUbufwnlJtmKKZ.svg"
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

            {/* Right side - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {!isSignedIn ? (
                <>
                  <Button
                    variant="secondary"
                    className="flex items-center space-x-1 text-white bg-black hover:bg-black"
                    onClick={handleSignInClick}
                  >
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

            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-black border-gray-800">
                  <div className="flex flex-col space-y-6 mt-6 px-4">
                    {/* Navigation Links */}
                    <nav className="flex flex-col space-y-4">
                      <Link
                        href="/"
                        className="text-white hover:text-gray-300 transition-colors text-lg"
                        onClick={closeMobileMenu}
                      >
                        {t.nav.home}
                      </Link>
                      <Link
                        href="/creator"
                        className="text-gray-300 hover:text-white transition-colors text-lg"
                        onClick={closeMobileMenu}
                      >
                        {t.nav.creator}
                      </Link>
                      <Link
                        href="/asset"
                        className="text-gray-300 hover:text-white transition-colors text-lg"
                        onClick={closeMobileMenu}
                      >
                        {t.nav.asset}
                      </Link>
                      <Link
                        href="/data-bridge"
                        className="text-gray-300 hover:text-white transition-colors text-lg"
                        onClick={closeMobileMenu}
                      >
                        {t.nav.dataBridge}
                      </Link>
                      <a
                        href={MARKET_PLACE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors text-lg"
                        onClick={closeMobileMenu}
                      >
                        {t.nav.marketPlace}
                      </a>
                    </nav>

                    {/* Divider */}
                    <div className="border-t border-gray-800"></div>

                    {/* Auth Section */}
                    <div className="flex flex-col space-y-4">
                      {!isSignedIn ? (
                        <Button
                          variant="ghost"
                          className="text-white hover:text-white hover:bg-transparent justify-start px-0"
                          onClick={() => {
                            handleSignInClick()
                            closeMobileMenu()
                          }}
                        >
                          {t.nav.signIn}
                        </Button>
                      ) : (
                        <div className="flex flex-col space-y-3">
                          <span className="text-gray-300 text-sm">
                            {t.auth.welcome}, {user?.firstName || user?.username}
                          </span>
                          <SignOutButton />
                        </div>
                      )}
                    </div>

                    {/* Language Switcher */}
                    <div className="flex flex-col">
                      <LanguageSwitcher />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} mode={authMode} />
    </>
  )
}
