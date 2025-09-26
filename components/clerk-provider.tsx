"use client";
import { ClerkProvider as Provider } from "@clerk/nextjs";
import { enUS, zhCN, zhTW } from "@clerk/localizations";
import { useLanguage } from "@/contexts/language-context";

const localizationMap = {
  en: enUS,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
};

export default function ClerkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = useLanguage();
  const clerkLocalization =
    localizationMap[language as keyof typeof localizationMap] || enUS;
  return <Provider localization={clerkLocalization}>{children}</Provider>;
}
