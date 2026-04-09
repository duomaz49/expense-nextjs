export default function TrustSecurity() {
  return (
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
  )
}
