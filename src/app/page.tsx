import Link from "next/link";

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
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">Expense Tracker</h1>
          
          <div className="flex gap-3">
            <Link 
              href="/auth/sign-in"
              className="px-6 py-2 bg-white/20 text-white rounded-lg backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/auth/sign-up"
              className="px-6 py-2 bg-white text-gray-900 rounded-lg hover:bg-white/90 transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Welcome Content */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Take Control of Your 
            <span className="block text-blue-300">Financial Future</span>
          </h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Track expenses, set budgets, and gain insights into your spending habits with our intuitive expense tracking platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/sign-up"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg"
            >
              Start Tracking For Free
            </Link>
            <Link 
              href="/auth/sign-in"
              className="px-8 py-4 bg-white/20 text-white rounded-lg backdrop-blur-sm hover:bg-white/30 transition-colors font-semibold text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-3">Easy Tracking</h3>
            <p className="text-white/80">Quickly add and categorize your expenses with our simple interface.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-3">Smart Insights</h3>
            <p className="text-white/80">Get detailed reports and insights about your spending patterns.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-3">Budget Goals</h3>
            <p className="text-white/80">Set budgets and track your progress towards financial goals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}