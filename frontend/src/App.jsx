import { useState } from 'react';

import './index.css';
import MotovexLanding from './components/MainComponent';
import Footer from './components/footer/Footer'; // ✅ correct path
import ContactUs from './components/contactUs/Contact';
import AboutUs from './components/aboutUs/About';
import ProfilePage from './components/ProfilePage/profile';
import Navigation from './components/navigation/Navigation';
import Home  from './components/home/Home';

function App() {
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  return (

    <div data-theme= "luxury" className="min-h-screen flex flex-col bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      {/* Main Content */}

      {/* Navigation */}
      <Navigation
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Home Section */}  
      <Home/>

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
