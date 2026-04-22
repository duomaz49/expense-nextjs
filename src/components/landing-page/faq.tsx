import { useTranslations } from "next-intl";

export default function Faq() {
  const t = useTranslations("landing.faq");
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">{t("heading")}</h3>
        <div className="max-w-3xl mx-auto space-y-6">
          <details className="bg-gray-50 p-6 rounded-lg">
            <summary className="font-bold cursor-pointer text-lg">{t("q1")}</summary>
            <p className="mt-4 text-gray-600">{t("a1")}</p>
          </details>
          <details className="bg-gray-50 p-6 rounded-lg">
            <summary className="font-bold cursor-pointer text-lg">{t("q2")}</summary>
            <p className="mt-4 text-muted-foreground">{t("a2")}</p>
          </details>
          <details className="bg-gray-50 p-6 rounded-lg">
            <summary className="font-bold cursor-pointer text-lg">{t("q3")}</summary>
            <p className="mt-4 text-muted-foreground">{t("a3")}</p>
          </details>
          <details className="bg-gray-50 p-6 rounded-lg">
            <summary className="font-bold cursor-pointer text-lg">{t("q4")}</summary>
            <p className="mt-4 text-gray-600">{t("a4")}</p>
          </details>
        </div>
      </div>
    </section>
  );
}
