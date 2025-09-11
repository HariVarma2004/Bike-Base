import { useState } from "react";
import MotovexLanding from "./components/MainComponent";
import ProfilePage from "./components/ProfilePage/profile";
import Home from "./components/home/Home";
import BikeSpecs from "./components/bikespecs/BikeSpecs";
import DukeImage from "./assets/Duke390.webp";
import AboutSite from "./components/AboutUs/AboutSite";

function App() {
  const [activeBike] = useState({
    id: 1,
    brand: "KTM",
    name: "Duke 390",
    model: "390",
    year: 2024,
    price: 3.10,
    description: "The KTM Duke 390 is a naked sport bike known for its aggressive styling and impressive performance. With a powerful 373.2cc liquid-cooled engine producing 43 HP and 37 Nm of torque, it offers an exhilarating riding experience.",
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
    image: DukeImage,
    available: true
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
      <section id="home">
        <Home />
      </section>

<<<<<<< HEAD
      <section id="specifications">
=======
      {/* Pass bike prop to MotovexLanding
      <main id="showcase">
        <MotovexLanding bike={activeBike} />
      </main> */}

      {/* Add BikeSpecs section and pass bike prop */}
      {/* <section id="specifications">
>>>>>>> c0f2b07918568fe136ceb6fafe113c2be1e577ab
        <BikeSpecs bike={activeBike} />
      </section> */}

      <section id="profile">
        <ProfilePage />
      </section>

      <section id="aboutSite">
        <AboutSite />
      </section>
    </div>
  );
}

export default App;