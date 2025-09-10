// src/pages/ContactUs.jsx
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  return (
    <section data-theme= "forest" className="min-h-screen bg-base-200 text-base-content flex flex-col items-center py-12 px-6">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-4 text-primary">Contact Us</h1>
      <p className="text-base-content/70 mb-12 text-center max-w-xl">
        Have questions about our Bike Garage, Community Hub, or Marketplace services?  
        Get in touch with us – we’d love to hear from you!
      </p>

      <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* Contact Info */}
        <div className="bg-base-100 rounded-2xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            Reach Us At
          </h2>

          <div className="flex items-center gap-4">
            <Mail className="text-primary" />
            <p className="opacity-80">support@bikebase.com</p>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="text-primary" />
            <p className="opacity-80">+91 98765 43210</p>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="text-primary" />
            <p className="opacity-80">
              BikeBase HQ, Madurai, Tamil Nadu, India
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-base-100 rounded-2xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            Send Us a Message
          </h2>

          <div>
            <label className="block text-sm opacity-70 mb-2">Your Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm opacity-70 mb-2">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm opacity-70 mb-2">Message</label>
            <textarea
              rows="4"
              className="textarea textarea-bordered w-full"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
