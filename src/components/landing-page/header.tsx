import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("landing.header");
  const tNav = useTranslations("nav");
  return (
    <div className="mb-12 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Image src="/icon.svg" alt={tNav("brand")} width={28} height={28} />
        <h1 className="text-2xl font-bold text-black drop-shadow-lg">{tNav("brand")}</h1>
      </div>

      <div className="flex gap-3">
        <Button asChild size="sm">
          <Link href="/auth/sign-in">{t("signIn")}</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/auth/sign-up">{t("getStarted")}</Link>
        </Button>
      </div>
    </div>
  );
}
