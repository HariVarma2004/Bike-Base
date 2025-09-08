// src/pages/ContactUs.jsx
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0a0f1c] to-[#091621] text-white flex flex-col items-center py-12 px-6">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-4 text-cyan-400">Contact Us</h1>
      <p className="text-gray-400 mb-12 text-center max-w-xl">
        Have questions about our Bike Garage, Community Hub, or Marketing services?  
        Get in touch with us – we’d love to hear from you!
      </p>

      <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* Contact Info */}
        <div className="bg-[#0f1b2d] rounded-2xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">
            Reach Us At
          </h2>

          <div className="flex items-center gap-4">
            <Mail className="text-cyan-400" />
            <p className="text-gray-300">support@bikebase.com</p>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="text-cyan-400" />
            <p className="text-gray-300">+91 98765 43210</p>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="text-cyan-400" />
            <p className="text-gray-300">
              BikeBase HQ, Madurai, Tamil Nadu, India
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-[#0f1b2d] rounded-2xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">
            Send Us a Message
          </h2>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Your Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-xl bg-[#0d1422] text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-xl bg-[#0d1422] text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Message</label>
            <textarea
              rows="4"
              className="w-full p-3 rounded-xl bg-[#0d1422] text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
