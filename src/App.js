// Martin Carballo Flores october 25/2024
// ------------------------------------------
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Section from './components/Section';
import MapComponent from './components/MapComponent';
// ------------------------------------------
import './style/index.css';
// ------------------------------------------
function App() {

  return (
    <div className="flex flex-col min-h-screen main">
      <Navbar />
      <MapComponent />
      <Section />
      <Footer id='footer'/>
    </div>
  );
}

export default App;