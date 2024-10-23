// Martin Carballo Flores october 21/2024
// ------------------------------------------
import { MapPin, Menu, CloudLightning } from 'lucide-react';
//
import Footer from './components/Footer';
import MapComponent from './components/MapComponent';
// ------------------------------------------
import './style/index.css'
// ------------------------------------------
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="customBG p-4">
        {/* <div className="container mx-auto flex justify-between items-center"> */}
        <div className="container flex items-center space-x-2">
          <h1 className="myh1"><CloudLightning size={24} /></h1>
          <h1 className="myh1 text-2xl font-bold">Ashur's storm chaser</h1>

          <button className="text-white absolute right-10">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <MapComponent />

      <div className="p-16 section">
        <div className="container mx-auto">
          <h2 className="text-2xl myh1 font-bold mb-4">Powered by NASA's data</h2>
          <p className="text-gray-700 myp">
            This map displays the location of hurricanes, storms and tornadoes
            all around the world. The data is taken from Nasa's Earth Observartory 
            Natural Event Tracker (OENET), which has been supported by <a className='mya' href="https://earthobservatory.nasa.gov/">NASA’s Earth Observatory</a> and <a className='mya' href='https://www.earthdata.nasa.gov/esdis'>Earth Science Data and Information System (ESDIS) Project</a>.
          </p>
          <div className="mt-4 flex items-center">
            <MapPin className="mr-2 mya" />
            <span className='mya'>Global scope</span>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;