import {Card, CardHeader, CardTitle, CardDescription} from "@/components/ui/card"
import {BarChart3, Zap, Target} from "lucide-react"
import Header from "@/components/landing-page/header";

export default function Hero() {
    return (
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
    );
}
