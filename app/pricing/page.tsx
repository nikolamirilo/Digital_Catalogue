import { Check, Star, Zap, Building2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navigation/Navbar"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small restaurants and cafes",
      price: "$29",
      period: "per month",
      icon: <Star className="h-6 w-6" />,
      features: [
        "Up to 3 digital menus",
        "QR code generation",
        "Basic analytics",
        "Mobile-responsive design",
        "Email support",
        "Menu updates unlimited",
        "Basic customization",
      ],
      popular: false,
      buttonText: "Start Free Trial",
      buttonVariant: "outline" as const,
    },
    {
      name: "Professional",
      description: "Ideal for growing restaurants and chains",
      price: "$79",
      period: "per month",
      icon: <Zap className="h-6 w-6" />,
      features: [
        "Up to 15 digital menus",
        "Advanced QR code customization",
        "Detailed analytics & insights",
        "Custom branding & themes",
        "Priority email & chat support",
        "Menu scheduling",
        "Multi-language support",
        "Integration with POS systems",
        "Customer feedback collection",
      ],
      popular: true,
      buttonText: "Start Free Trial",
      buttonVariant: "default" as const,
    },
    {
      name: "Enterprise",
      description: "For large restaurant chains and franchises",
      price: "$199",
      period: "per month",
      icon: <Building2 className="h-6 w-6" />,
      features: [
        "Unlimited digital menus",
        "White-label solution",
        "Advanced analytics dashboard",
        "Custom integrations",
        "Dedicated account manager",
        "24/7 phone support",
        "Multi-location management",
        "API access",
        "Custom reporting",
        "Staff training included",
        "SLA guarantee",
      ],
      popular: false,
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
    },
  ]

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-2 bg-indigo-500/10 rounded-full mb-6">
            <Badge className="bg-indigo-500 text-white px-4 py-1 text-sm font-medium">
              Pricing Plans
            </Badge>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Simple, 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600"> Transparent </span>
            Pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan for your restaurant. Start with a 14-day free trial, no credit card required.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 justify-center max-w-6xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col transition-all duration-500 hover:scale-105 group ${
                plan.popular 
                  ? "bg-gradient-to-br from-white to-gray-50 border-2 border-indigo-400 shadow-2xl shadow-indigo-500/20 scale-105 z-10" 
                  : "bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl hover:shadow-2xl hover:border-gray-300"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <Badge className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-2 text-sm font-semibold shadow-lg">
                    ⭐ Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-6 pt-8">
                <div
                  className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                    plan.popular 
                      ? "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30" 
                      : "bg-gradient-to-br from-gray-700 to-gray-800 text-white shadow-lg"
                  }`}
                >
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600 mb-6 text-base leading-relaxed">
                  {plan.description}
                </CardDescription>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2 text-lg">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="px-8 flex-1">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start group/feature">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-4 mt-0.5 transition-all duration-200 group-hover/feature:bg-green-200">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-700 text-base leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="px-8 pb-8 pt-6 mt-auto">
                <Button
                  className={`w-full py-4 text-base font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40"
                      : "bg-gray-900 hover:bg-black text-white shadow-lg hover:shadow-xl border-0"
                  }`}
                  variant={plan.buttonVariant}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to know about our pricing and plans
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                question: "Can I change plans anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                question: "Is there a setup fee?",
                answer: "No setup fees. Start with our 14-day free trial and only pay when you're ready."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans."
              },
              {
                question: "Do you offer refunds?",
                answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:bg-gray-800/70">
                <h3 className="font-bold text-xl text-white mb-4">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed text-base">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl p-16 border border-gray-700/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600"> digitize </span>
              your menu?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of restaurants already using our platform to create beautiful, interactive digital menus that
              boost sales and improve customer experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-10 py-4 text-lg font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300"
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-2 border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 px-10 py-4 text-lg font-semibold transition-all duration-300"
              >
                Schedule Demo
              </Button>
            </div>
            <p className="text-gray-400 mt-6 text-sm">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}