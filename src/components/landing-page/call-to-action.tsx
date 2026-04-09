import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold mb-6">Ready to Take Control?</h3>
          <p className="text-xl mb-8 text-primary-foreground/90">Join thousands who've transformed their finances with our free expense
            tracker</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/auth/sign-up">
                Start Tracking Free →
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
