import './index.css';
import MotovexLanding from './components/MainComponent';
import Footer from './components/Footer/footer'; // ✅ correct path

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      {/* Main Content */}
      <main className="flex-1">
        <MotovexLanding />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
