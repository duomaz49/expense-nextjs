import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart3, Zap, Target } from "lucide-react";
import Header from "@/components/landing-page/header";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("landing.hero");
  return (
    <div className="main-page min-h-[60vh] bg-center bg-cover bg-no-repeat relative">
      {/* Content */}
      <div className="relative z-10 container mx-auto p-4 ">
        {/* Header */}
        <Header />
        {/* Welcome Content */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-600 mb-6 drop-shadow-2xl">
            {t("titleLine1")}
            <span className="block text-black drop-shadow-2xl">{t("titleLine2")}</span>
          </h2>

          <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            {t("subtitle")}
          </p>
        </div>

        {/* Initial Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="text-center bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
            <CardHeader className="pb-6">
              <Zap className="w-8 h-8 mb-3 text-blue-600 drop-shadow-sm mx-auto" />
              <CardTitle className="text-xl mb-2 drop-shadow-sm text-blue-900">
                {t("feature1Title")}
              </CardTitle>
              <CardDescription className="drop-shadow-sm text-blue-700">
                {t("feature1Desc")}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
            <CardHeader className="pb-6">
              <BarChart3 className="w-8 h-8 mb-3 text-emerald-600 drop-shadow-sm mx-auto" />
              <CardTitle className="text-xl mb-2 drop-shadow-sm text-emerald-900">
                {t("feature2Title")}
              </CardTitle>
              <CardDescription className="drop-shadow-sm text-emerald-700">
                {t("feature2Desc")}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
            <CardHeader className="pb-6">
              <Target className="w-8 h-8 mb-3 text-violet-600 drop-shadow-sm mx-auto" />
              <CardTitle className="text-xl mb-2 drop-shadow-sm text-violet-900">
                {t("feature3Title")}
              </CardTitle>
              <CardDescription className="drop-shadow-sm text-violet-700">
                {t("feature3Desc")}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
