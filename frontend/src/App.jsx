import { useState } from "react";

import MotovexLanding from "./components/MainComponent";
import Footer from "./components/footer/Footer";
import ContactUs from "./components/contactUs/Contact";
import AboutUs from "./components/aboutUs/About";
import ProfilePage from "./components/ProfilePage/profile";
import Navigation from "./components/navigation/Navigation";
import Home from "./components/home/Home";

function App() {
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

      {/* Hero / Home Section */}
      <section id="home">
        <Home />
      </section>

      {/* Main Showcase */}
      <main id="showcase" className="flex-1">
        <MotovexLanding />
      </main>

      {/* About Us */}
      <section id="about">
        <AboutUs />
      </section>

      {/* Profile Page */}
      <section id="profile">
        <ProfilePage />
      </section>

      {/* Contact Us */}
      <section id="contact">
        <ContactUs />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
