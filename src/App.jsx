import MatrixRain from './components/MatrixRain';
import ScanlineOverlay from './components/ScanlineOverlay';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import InteractiveTerminal from './components/InteractiveTerminal';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
// import Experience from './sections/Experience'; // Uncomment when you have experience to show
import Contact from './sections/Contact';
import './App.css';

function App() {
  return (
    <div className="app">
      <MatrixRain />
      <ScanlineOverlay />
      <Navbar />
      <div className="app-content">
        <Hero />
        <InteractiveTerminal />
        <Skills />
        <Projects />
        {/* <Experience /> */}{/* Uncomment when you have experience to show */}
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
