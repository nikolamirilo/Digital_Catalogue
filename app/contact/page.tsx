import React from 'react';

export default function ContactPage() {
  return (
    <div className="container mx-auto py-16 px-4 text-center text-gray-900">
      <h1 className="text-3xl font-bold mb-4 text-white">Contact Us</h1>
      <p className="mb-8 text-lg text-white max-w-[500px] mx-auto">We'd love to hear from you! Please reach out with any questions, feedback, or partnership inquiries.</p>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8 text-left">
        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input className="w-full border rounded px-3 py-2" type="text" placeholder="Your Name" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input className="w-full border rounded px-3 py-2" type="email" placeholder="you@email.com" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea className="w-full border rounded px-3 py-2" rows={4} placeholder="How can we help?" />
          </div>
          <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition">Send</button>
        </form>
      </div>
    </div>
  );
}
