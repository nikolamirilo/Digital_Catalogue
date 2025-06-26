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
    <Navbar/>
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white sm:text-4xl lg:text-5xl">Simple, Transparent Pricing</h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your restaurant. Start with a 14-day free trial, no credit card required.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-8 lg:gap-2 lg:grid-cols-3 justify-center content-center max-w-[1100px] mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative max-w-[350px] w-full flex flex-col mx-auto ${
                plan.popular ? "border-2 border-indigo-400 shadow-xl scale-105 bg-white" : "border border-gray-700 shadow-lg bg-white"
              } transition-all duration-300 hover:shadow-xl`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white px-3 py-0.5 text-xs">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-2 p-2">
                <div
                  className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                    plan.popular ? "bg-indigo-500 text-white" : "bg-gray-700 text-white"
                  }`}
                >
                  {plan.icon}
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">{plan.name}</CardTitle>
                <CardDescription className="text-gray-800 mt-1 text-sm">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-800 ml-1 text-sm">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="px-2 flex-1">
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-900 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="px-2 pt-2 mt-auto">
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                      : "bg-gray-900 text-white border border-gray-600 hover:bg-gray-800"
                  } text-sm py-2`}
                  variant={plan.buttonVariant}
                  size="sm"
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h3 className="font-semibold text-lg text-white mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-300">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg text-white mb-2">Is there a setup fee?</h3>
              <p className="text-gray-300">
                No setup fees. Start with our 14-day free trial and only pay when you're ready.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg text-white mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-300">
                We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg text-white mb-2">Do you offer refunds?</h3>
              <p className="text-gray-300">
                Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gray-900 rounded-2xl shadow-lg p-12 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to digitize your menu?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of restaurants already using our platform to create beautiful, interactive digital menus that
            boost sales and improve customer experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600 text-white px-8">
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-gray-900 text-white border-gray-600 hover:bg-gray-800 px-8"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}