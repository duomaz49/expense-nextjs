import {Badge} from "@/components/ui/badge";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {DollarSign, Smartphone, Shield} from "lucide-react"

export default function ForeverFree() {
  return (
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
          <Card
            className="text-center bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
            <CardHeader className="pb-6">
              <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                <DollarSign className="w-6 h-6 text-green-600"/>
              </div>
              <CardTitle className="text-xl mb-2 text-green-900">No Hidden Costs</CardTitle>
              <CardDescription className="text-green-700">No premium plans, no surprise charges, no credit card required</CardDescription>
            </CardHeader>
          </Card>
          <Card
            className="text-center bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
            <CardHeader className="pb-6">
              <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Smartphone className="w-6 h-6 text-blue-600"/>
              </div>
              <CardTitle className="text-xl mb-2 text-blue-900">All Features Included</CardTitle>
              <CardDescription className="text-blue-700">Get the complete expense tracking experience at zero cost</CardDescription>
            </CardHeader>
          </Card>
          <Card
            className="text-center bg-white/80 backdrop-blur-md border-white/50 h-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
            <CardHeader className="pb-6">
              <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-purple-600"/>
              </div>
              <CardTitle className="text-xl mb-2 text-purple-900">No Ads</CardTitle>
              <CardDescription className="text-purple-700">Clean, distraction-free interface focused on your finances</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  )
}
