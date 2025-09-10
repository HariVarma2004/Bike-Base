import MotovexLanding from "./components/MainComponent";
import ProfilePage from "./components/ProfilePage/profile";
import Home from "./components/home/Home";
import BikeSpecs from "./components/bikespecs/BikeSpecs";
import DukeImage from "./assets/Duke390.webp";

function App() {
  return (
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
  );
}

export default App;