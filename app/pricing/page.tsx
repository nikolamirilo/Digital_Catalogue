import React from 'react';

export default function PricingPage() {
  return (
    <div className="container mx-auto py-16 px-4 text-center text-gray-900">
      <h1 className="text-3xl font-bold mb-4 text-white">Pricing</h1>
      <p className="mb-8 text-lg text-white">Choose the plan that fits your restaurant best.</p>
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        <div className="bg-white rounded-lg shadow p-8 flex-1">
          <h2 className="text-xl font-semibold mb-2">Starter</h2>
          <p className="mb-4">Perfect for small restaurants and cafes.</p>
          <div className="text-3xl font-bold mb-4">Free</div>
          <ul className="mb-6 text-left list-disc list-inside">
            <li>1 Menu</li>
            <li>Basic Analytics</li>
            <li>Email Support</li>
          </ul>
          <button className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition">Get Started</button>
        </div>
        <div className="bg-white rounded-lg shadow p-8 flex-1 border-2 border-primary">
          <h2 className="text-xl font-semibold mb-2">Pro</h2>
          <p className="mb-4">For growing restaurants with more needs.</p>
          <div className="text-3xl font-bold mb-4">$19<span className="text-base font-normal">/mo</span></div>
          <ul className="mb-6 text-left list-disc list-inside">
            <li>Unlimited Menus</li>
            <li>Advanced Analytics</li>
            <li>Priority Support</li>
          </ul>
          <button className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition">Start Pro</button>
        </div>
      </div>
    </div>
  );
}
