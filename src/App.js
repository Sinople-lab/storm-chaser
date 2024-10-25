// Martin Carballo Flores october 25/2024
// ------------------------------------------
import { MapPin} from 'lucide-react';
//
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import MapComponent from './components/MapComponent';
// ------------------------------------------
import './style/index.css';
// ------------------------------------------
function App() {

  return (
    <div className="flex flex-col min-h-screen main">
      <Navbar />
      <MapComponent />

      <div className="p-12 section">
        <div className="container mx-auto">
          <h2 className="text-2xl myh1 font-bold mb-4">Powered by NASA</h2>
          <p className="text-gray-700 myp">
            This map displays the location of severe storms and tornadoes
            all around the world. Just give me a few seconts while I gather natural disaster's data from
            NASA's Observatory. The data is taken from Nasa's Earth Observartory 
            Natural Event Tracker (OENET), which has been supported by <a className='mya' href="https://earthobservatory.nasa.gov/">NASA’s Earth Observatory</a> and <a className='mya' href='https://www.earthdata.nasa.gov/esdis'>Earth Science Data and Information System (ESDIS) Project</a>.
          </p>
          <div className="mt-4 flex items-center">
            <MapPin className="mr-2 mya" />
            <span className='mya'>Global scope</span>
          </div>
        </div>
      </div>
      
      <Footer id='footer'/>
    </div>
  );
}

export default App;