import './index.css';
import MotovexLanding from './components/MainComponent';
import Footer from './components/Footer/footer'; // ✅ correct path
import ContactUs from './components/ContactUs/contact';
import AboutUs from './components/AboutUs/about';
import ProfilePage from './components/ProfilePage/profile';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      {/* Main Content */}
      <main className="flex-1">
        <MotovexLanding />
      </main>

      {/* About Us */}
      <AboutUs/>

      {/* Profile Page */}
      <ProfilePage/>

      {/* ContactUs */}
      <ContactUs/>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;
