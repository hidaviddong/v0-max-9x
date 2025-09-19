"use client"

import { useLanguage } from "@/contexts/language-context"
import { VOBILE_X_URL, VOBILE_LINKEDIN_URL } from "@/lib/constants"
import Image from "next/image";

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
          {/* Logo and description */}
          <div className="flex items-start space-x-4 max-w-4xl">
              <Image
          src="https://vobile-apps.oss-cn-hangzhou.aliyuncs.com/apollo/siteLogo.svg"
          alt="Vobile Logo"
          width={100}
          height={100}
        />
            <div className="text-sm text-gray-400 leading-relaxed">{t.footer.description}</div>
          </div>

          {/* Right side links */}
          <div className="flex items-center space-x-6 flex-shrink-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              {t.footer.privacyPolicy}
            </a>
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
