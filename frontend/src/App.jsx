import { useState } from "react";
import { Routes, Route } from "react-router-dom";

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

      {/* Page Routes */}
      <main className="flex-1">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <section id="home">
                  <Home />
                </section>

                <main id="showcase">
                  <MotovexLanding />
                </main>

                <section id="profile">
                  <ProfilePage />
                </section>
              </>
            }
          />

          {/* About Us Page */}
          <Route path="/about" element={<AboutUs />} />

          {/* Contact Us Page */}
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </main>

      {/* Footer (always visible) */}
      <Footer />
    </div>
  );
}

export default App;
