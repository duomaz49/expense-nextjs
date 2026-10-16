import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/landing-page/hero";
import AppOverview from "@/components/landing-page/app-overview";
import QuickStart from "@/components/landing-page/quick-start";
import FeatureShowCase from "@/components/landing-page/feature-show-case";
import TrustSecurity from "@/components/landing-page/trust-security";
import CallToAction from "@/components/landing-page/call-to-action";
import Faq from "@/components/landing-page/faq";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <AppOverview />
      <QuickStart />
      <FeatureShowCase />
      <TrustSecurity />
      <CallToAction />
      <Faq />
    </>
  );
}
