"use client"

import { useLanguage } from "@/contexts/language-context"
import { VOBILE_X_URL, VOBILE_LINKEDIN_URL } from "@/lib/constants"
import Image from "next/image";
import Link from "next/link"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
          {/* Logo and description */}
          <div className="flex items-start space-x-4 max-w-4xl">
              <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/siteLogo%281%29-S3jEfhyZoAHncrtARHzwj8gvUw3Bz7.svg"
          alt="Vobile Logo"
          width={100}
          height={100}
        />
            <div className="text-sm text-gray-400 leading-relaxed">{t.footer.description}</div>
          </div>

          {/* Right side links */}
          <div className="flex items-center space-x-6 flex-shrink-0">
            <Link href="/privacypolicy" className="text-gray-400 hover:text-white transition-colors text-sm">
              {t.footer.privacyPolicy}
            </Link>
            <a
              href={VOBILE_X_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              X
            </a>
            <a
              href={VOBILE_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
