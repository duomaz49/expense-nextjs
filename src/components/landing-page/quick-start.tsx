export default function QuickStart() {
  return (
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
  )
}
