import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, BarChart3, Tag, CreditCard, Calendar, Search } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FeatureShowCase() {
  const t = useTranslations("landing.features");
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">{t("heading")}</h3>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card
            className="bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-200 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-700" />
                </div>
                <CardTitle className="text-lg text-blue-900">{t("visualReportsTitle")}</CardTitle>
              </div>
              <CardDescription className="text-blue-800">{t("visualReportsDesc")}</CardDescription>
            </CardHeader>
          </Card>
          <Card
            className="bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-200 rounded-xl flex items-center justify-center">
                  <Tag className="w-5 h-5 text-emerald-700" />
                </div>
                <CardTitle className="text-lg text-emerald-900">{t("smartCategoriesTitle")}</CardTitle>
              </div>
              <CardDescription className="text-emerald-800">{t("smartCategoriesDesc")}</CardDescription>
            </CardHeader>
          </Card>
          <Card
            className="bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-violet-600" />
                </div>
                <CardTitle className="text-lg text-violet-900">{t("multipleAccountsTitle")}</CardTitle>
              </div>
              <CardDescription className="text-violet-700">{t("multipleAccountsDesc")}</CardDescription>
            </CardHeader>
          </Card>
          <Card
            className="bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                <CardTitle className="text-lg text-orange-900">{t("monthlyBudgetsTitle")}</CardTitle>
              </div>
              <CardDescription className="text-orange-700">{t("monthlyBudgetsDesc")}</CardDescription>
            </CardHeader>
          </Card>
          <Card
            className="bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                  <Search className="w-5 h-5 text-rose-600" />
                </div>
                <CardTitle className="text-lg text-rose-900">{t("searchFilterTitle")}</CardTitle>
              </div>
              <CardDescription className="text-rose-700">{t("searchFilterDesc")}</CardDescription>
            </CardHeader>
          </Card>
          <Card
            className="bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-teal-600" />
                </div>
                <CardTitle className="text-lg text-teal-900">{t("mobileFriendlyTitle")}</CardTitle>
              </div>
              <CardDescription className="text-teal-700">{t("mobileFriendlyDesc")}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
