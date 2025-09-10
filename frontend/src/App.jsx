import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import MotovexLanding from "./components/MainComponent";
import Footer from "./components/footer/Footer";
import ContactUs from "./components/contactUs/Contact";
import AboutUs from "./components/aboutUs/About";
import ProfilePage from "./components/ProfilePage/profile";
import Navigation from "./components/navigation/Navigation";
import Home from "./components/home/Home";
import BikeSpecs from "./components/bikespecs/BikeSpecs";
import DukeImage from "./assets/Duke390.webp";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Bike data state
  const [activeBike, setActiveBike] = useState({
    brand: "KTM",
    name: "Duke 390",
    model: "390",
    year: 2024,
    price: 3.10,
    description: "The KTM Duke 390 is a naked sport bike known for its aggressive styling and impressive performance. With a powerful 373.2cc liquid-cooled engine producing 43 HP and 37 Nm of torque, it offers an exhilarating riding experience. Features include a Trellis frame, WP suspension, ByBre brakes, and a full-color TFT display. Perfect for urban commuting and weekend adventures.",
    milage: 30,
    engineCapacity: 373.2,
    topSpeed: 167,
    power: 43,
    torque: 37,
    fuelType: "Petrol",
    transmission: "6-speed manual",
    brakes: "Dual Channel ABS",
    tires: "Michelin Pilot Street Radial",
    suspension: "WP Apex",
    weight: 149,
    seatHeight: 800,
    fuelCapacity: 13.4,
    colorOptions: ["#FF6600", "#000000", "#FFFFFF"],
    image: DukeImage
  });

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
            path="*"
            element={
              <>
                <section id="home">
                  <Home />
                </section>

                {/* <main id="showcase">
                  <MotovexLanding bike={activeBike} />
                </main> */}

                <section id="specifications" className="py-12 bg-base-200">
                  <BikeSpecs bike={activeBike} />
                </section>

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