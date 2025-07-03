import Navbar from '@/components/navigation/Navbar';
import React from 'react';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-24 text-center text-gray-100">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="mb-10 text-lg max-w-xl mx-auto text-gray-300">
          We'd love to hear from you! Please reach out with any questions, feedback, or partnership inquiries.
        </p>

        <div className="max-w-lg mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl text-left border border-white/10">
          <form className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-white">Name</label>
              <input
                className="w-full rounded-xl border border-gray-600 bg-gray-900 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition"
                type="text"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-white">Email</label>
              <input
                className="w-full rounded-xl border border-gray-600 bg-gray-900 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition"
                type="email"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-white">Message</label>
              <textarea
                className="w-full rounded-xl border border-gray-600 bg-gray-900 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition"
                rows={5}
                placeholder="How can we help?"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
