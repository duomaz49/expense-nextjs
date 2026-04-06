import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
export default async function Page() {
  return (
    <div
      className="min-h-screen bg-center bg-repeat relative"
      style={{ backgroundImage: 'url(/bg-home.jpg)', backgroundSize: '100% auto' }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto p-4">
        {/* Header */}
        <div className="mb-12 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">Expense Tracker</h1>

          <div className="flex gap-3">
            <Button asChild>
              <Link href="/auth/sign-in">
                Sign In
              </Link>
            </Button>
            <Button asChild>
                <Link href="/auth/sign-up">
                  Get Started
                </Link>
            </Button>
          </div>
        </div>

        {/* Welcome Content */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
            Take Control of Your
            <span className="block text-blue-300">Financial Future</span>
          </h2>

          <p className="text-l text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Track expenses, set budgets, and gain insights into your spending habits with our intuitive expense tracking platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link
                href="/auth/sign-up"
              >
                Start Tracking For Free
              </Link>
            </Button>

            <Button asChild>
                <Link
                href="/auth/sign-in"
              >
                Sign In
              </Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle>Easy Tracking</CardTitle>
              <CardDescription className="text-white/80">Quickly add and categorize your expenses with our simple interface.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle>Smart Insights</CardTitle>
              <CardDescription className="text-white/80">Get detailed reports and insights about your spending patterns.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle>Budget Goals</CardTitle>
              <CardDescription className="text-white/80">Set budgets and track your progress towards financial goals.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}