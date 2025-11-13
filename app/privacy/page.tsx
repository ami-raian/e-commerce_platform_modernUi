export default function PrivacyPage() {
  return (
    <div className="container-xl py-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="section-title mb-8">Privacy Policy</h1>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Marqen values your privacy. This privacy policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed">
            We collect information you provide directly, such as when you create an account, make a purchase, or contact
            us. This may include your name, email address, shipping address, and payment information.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• To process your transactions and send related information</li>
            <li>• To send promotional communications (with your consent)</li>
            <li>• To improve our website and services</li>
            <li>• To comply with legal obligations</li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement appropriate technical and organizational measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about this privacy policy, please contact us at marqenbd@gmail.com.
          </p>
        </div>
      </div>
    </div>
  )
}
