import ForeverFree from "@/components/landing-page/forever-free";
import QuickStart from "@/components/landing-page/quick-start";
import FeatureShowCase from "@/components/landing-page/feature-show-case";
import TrustSecurity from "@/components/landing-page/trust-security";
import CallToAction from "@/components/landing-page/call-to-action";
import Faq from "@/components/landing-page/faq";

export default async function Page() {
  return (
    <>
      <ForeverFree />
      <QuickStart />
      <FeatureShowCase />
      <TrustSecurity />
      <CallToAction />
      <Faq/>
    </>
  );
}
