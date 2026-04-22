import { useTranslations } from "next-intl";

export default function QuickStart() {
  const t = useTranslations("landing.quickStart");
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">{t("heading")}</h3>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center group">
            <div className="relative mb-6">
              <div
                className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-2xl font-bold text-primary group-hover:bg-primary/20 transition-colors">
                1
              </div>
            </div>
            <h4 className="font-bold mb-2 text-lg">{t("step1Title")}</h4>
            <p className="text-muted-foreground">{t("step1Desc")}</p>
          </div>
          <div className="text-center group">
            <div className="relative mb-6">
              <div
                className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-2xl font-bold text-primary group-hover:bg-primary/20 transition-colors">
                2
              </div>
            </div>
            <h4 className="font-bold mb-2 text-lg">{t("step2Title")}</h4>
            <p className="text-muted-foreground">{t("step2Desc")}</p>
          </div>
          <div className="text-center group">
            <div className="relative mb-6">
              <div
                className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-2xl font-bold text-primary group-hover:bg-primary/20 transition-colors">
                3
              </div>
            </div>
            <h4 className="font-bold mb-2 text-lg">{t("step3Title")}</h4>
            <p className="text-muted-foreground">{t("step3Desc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
