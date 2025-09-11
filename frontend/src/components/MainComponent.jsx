import Navigation from "./navigation/Navigation.jsx";
import BikeVariant from "./ui/BikeVariant.jsx";
import StatCard from "./ui/StatCard.jsx";
import MobileLayout from "./layout/MobileLayout.jsx";
import DesktopLayout from "./layout/DesktopLayout.jsx";

// Main Component - Now accepts bike prop
const MainComponent = ({ bike }) => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,theme(colors.primary/10),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,theme(colors.primary/5)_50%,transparent_100%)]"></div>

      {/* Navigation - ADDED THIS LINE */}
      <Navigation />

      {/* Main Content */}
      <div className="relative z-10 px-4 md:px-6 py-6 md:py-12">
        {/* Mobile Layout - Pass bike prop */}
        <div className="md:hidden">
          <MobileLayout bike={bike} />
        </div>

        {/* Desktop Layout - Pass bike prop */}
        <div className="hidden md:block">
          <DesktopLayout bike={bike} />
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 md:w-96 h-24 md:h-32 bg-gradient-to-t from-primary/20 to-transparent blur-2xl md:blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default MainComponent;