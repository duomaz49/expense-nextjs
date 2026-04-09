export default function Faq() {
  return (
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
  )
}
