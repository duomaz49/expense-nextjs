import {Card, CardHeader, CardTitle, CardDescription} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {DollarSign, Smartphone, Shield, BarChart3, Tag, CreditCard, Calendar, Search, Zap, Target} from "lucide-react"
import Header from "@/components/header";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      {/* Hero Section */}
      <div className="main-page min-h-[60vh] bg-center bg-cover bg-no-repeat relative">
        {/* Content */}
        <div className="relative z-10 container mx-auto p-4 ">
          {/* Header */}
          <Header/>
          {/* Welcome Content */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-600 mb-6 drop-shadow-2xl">
              Take Control of Your
              <span className="block text-black drop-shadow-2xl">Financial Future</span>
            </h2>

            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Track expenses, set budgets, and gain insights into your spending habits with our intuitive expense tracking platform.
            </p>
          </div>

          {/* Initial Features */}
          <div className="mt-20 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="text-center bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
              <CardHeader className="pb-6">
                <Zap className="w-8 h-8 mb-3 text-blue-600 drop-shadow-sm mx-auto" />
                <CardTitle className="text-xl mb-2 drop-shadow-sm text-blue-900">Easy Tracking</CardTitle>
                <CardDescription className="drop-shadow-sm text-blue-700">Quickly add and categorize your expenses with our simple interface</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
              <CardHeader className="pb-6">
                <BarChart3 className="w-8 h-8 mb-3 text-emerald-600 drop-shadow-sm mx-auto" />
                <CardTitle className="text-xl mb-2 drop-shadow-sm text-emerald-900">Smart Insights</CardTitle>
                <CardDescription className="drop-shadow-sm text-emerald-700">Get detailed reports and insights about your spending patterns</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
              <CardHeader className="pb-6">
                <Target className="w-8 h-8 mb-3 text-violet-600 drop-shadow-sm mx-auto" />
                <CardTitle className="text-xl mb-2 drop-shadow-sm text-violet-900">Budget Goals</CardTitle>
                <CardDescription className="drop-shadow-sm text-violet-700">Set budgets and track your progress towards financial goals</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* Forever Free Section */}
      <section className="py-16 bg-green-50/50 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">100% Free</Badge>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Completely Free, Forever</h3>
            <p className="text-gray-900 max-w-2xl mx-auto">
              No catches, no trials, no premium upsells. Full expense tracking for everyone.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="text-center bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
              <CardHeader className="pb-6">
                <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl mb-2 text-green-900">No Hidden Costs</CardTitle>
                <CardDescription className="text-green-700">No premium plans, no surprise charges, no credit card required</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
              <CardHeader className="pb-6">
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Smartphone className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl mb-2 text-blue-900">All Features Included</CardTitle>
                <CardDescription className="text-blue-700">Get the complete expense tracking experience at zero cost</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
              <CardHeader className="pb-6">
                <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl mb-2 text-purple-900">No Ads</CardTitle>
                <CardDescription className="text-purple-700">Clean, distraction-free interface focused on your finances</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Get Started in 30 Seconds</h3>
            <p className="text-muted-foreground">Three simple steps to better financial tracking</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="relative mb-6">
                <div
                  className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-2xl font-bold text-primary group-hover:bg-primary/20 transition-colors">
                  1
                </div>
              </div>
              <h4 className="font-bold mb-2 text-lg">Sign Up Free</h4>
              <p className="text-muted-foreground">Just your email, no payment info needed</p>
            </div>
            <div className="text-center group">
              <div className="relative mb-6">
                <div
                  className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-2xl font-bold text-primary group-hover:bg-primary/20 transition-colors">
                  2
                </div>
              </div>
              <h4 className="font-bold mb-2 text-lg">Add Your First Expense</h4>
              <p className="text-muted-foreground">Coffee, lunch, gas - track it all</p>
            </div>
            <div className="text-center group">
              <div className="relative mb-6">
                <div
                  className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-2xl font-bold text-primary group-hover:bg-primary/20 transition-colors">
                  3
                </div>
              </div>
              <h4 className="font-bold mb-2 text-lg">See Your Patterns</h4>
              <p className="text-muted-foreground">Watch your spending habits unfold</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Everything You Need</h3>
            <p className="text-muted-foreground">Powerful features that don't cost a penny</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-200 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-blue-700" />
                  </div>
                  <CardTitle className="text-lg text-blue-900">Visual Reports</CardTitle>
                </div>
                <CardDescription className="text-blue-800">Charts and graphs to visualize your spending patterns clearly</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-emerald-200 rounded-xl flex items-center justify-center">
                    <Tag className="w-5 h-5 text-emerald-700" />
                  </div>
                  <CardTitle className="text-lg text-emerald-900">Smart Categories</CardTitle>
                </div>
                <CardDescription className="text-emerald-800">Automatically categorize your expenses with intelligent suggestions</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-violet-600" />
                  </div>
                  <CardTitle className="text-lg text-violet-900">Multiple Accounts</CardTitle>
                </div>
                <CardDescription className="text-violet-700">Track expenses across cash, credit cards, and bank accounts</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg text-orange-900">Monthly Budgets</CardTitle>
                </div>
                <CardDescription className="text-orange-700">Set spending limits and monitor your progress towards goals</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                    <Search className="w-5 h-5 text-rose-600" />
                  </div>
                  <CardTitle className="text-lg text-rose-900">Search & Filter</CardTitle>
                </div>
                <CardDescription className="text-rose-700">Find any expense quickly with powerful search and filters</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-teal-600" />
                  </div>
                  <CardTitle className="text-lg text-teal-900">Mobile Friendly</CardTitle>
                </div>
                <CardDescription className="text-teal-700">Perfect responsive design that works seamlessly on any device</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">Your Data is Protected</h3>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <h4 className="font-bold mb-4 text-lg">🔒 Secure by Default</h4>
              <p className="text-muted-foreground">HTTPS encryption and secure database storage protect your information</p>
            </div>
            <div className="text-center">
              <h4 className="font-bold mb-4 text-lg">🏠 Privacy Focused</h4>
              <p className="text-muted-foreground">Your expense data is yours - we don't share or sell your information</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
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

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h3>
          <div className="max-w-3xl mx-auto space-y-6">
            <details className="bg-gray-50 p-6 rounded-lg">
              <summary className="font-bold cursor-pointer text-lg">Is it really free forever?</summary>
              <p className="mt-4 text-gray-600">Yes! No trials, no premium plans, no hidden fees. We believe everyone deserves access to
                good financial tools.</p>
            </details>
            <details className="bg-gray-50 p-6 rounded-lg">
              <summary className="font-bold cursor-pointer text-lg">Does this app make any profit?</summary>
              <p className="mt-4 text-muted-foreground">We don't! This is a passion project combining our love for financial empowerment and
                software development. We believe everyone deserves access to quality financial tools.</p>
            </details>
            <details className="bg-gray-50 p-6 rounded-lg">
              <summary className="font-bold cursor-pointer text-lg">Is my financial data secure?</summary>
              <p className="mt-4 text-muted-foreground">Yes! We use HTTPS encryption for data in transit and secure database storage. Your
                personal financial information is never shared with third parties.</p>
            </details>
            <details className="bg-gray-50 p-6 rounded-lg">
              <summary className="font-bold cursor-pointer text-lg">Can I use it on my phone?</summary>
              <p className="mt-4 text-gray-600">Yes! Our web app works perfectly on mobile.</p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
