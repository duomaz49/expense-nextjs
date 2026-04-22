import { useTranslations } from "next-intl";

export default function TrustSecurity() {
  const t = useTranslations("landing.trust");
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12 text-foreground">{t("heading")}</h3>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="text-center">
            <h4 className="font-bold mb-4 text-lg">{t("secureTitle")}</h4>
            <p className="text-muted-foreground">{t("secureDesc")}</p>
          </div>
          <div className="text-center">
            <h4 className="font-bold mb-4 text-lg">{t("privacyTitle")}</h4>
            <p className="text-muted-foreground">{t("privacyDesc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
