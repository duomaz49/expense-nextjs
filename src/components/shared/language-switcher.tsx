"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("language");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(
        `${pathname}${window.location.search}${window.location.hash}`,
        { locale: nextLocale as (typeof routing.locales)[number] },
      );
    });
  };

  return (
    <div className="min-w-28">
      <Select value={locale} onValueChange={handleChange} disabled={isPending}>
        <SelectTrigger size="sm" className="w-full text-xs" aria-label={t("switcher")}>
          <Globe className="size-3.5" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {routing.locales.map((l) => (
            <SelectItem key={l} value={l} className="text-xs">
              {t(l)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
