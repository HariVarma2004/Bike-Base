import React, { useState } from "react";
import Navigation from "../navigation/Navigation";
import Footer from "../footer/Footer";

export default function MainLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      data-theme="forest"
      className="min-h-screen flex flex-col bg-base-100 text-base-content"
    >
      {/* Navigation */}
      <Navigation
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Page Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
