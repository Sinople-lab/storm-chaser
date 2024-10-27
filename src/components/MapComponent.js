// Martin Carballo Flores october 25/2024
// ------------------------------------------
// OpenLayers
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Icon } from 'ol/style';
// -------------------------------------
import { useState, useEffect, useRef, useMemo } from 'react';
//
const DEFAULT_ZOOM = 2
const DEFAULT_CENTER = [0, 0]
//
const MapComponent = () => {

  // variables to store the data
  const [eventData, setEventData]=useState([])                // array to store validated data
  const [tempData,setTemp]=useState([])                       // array to store fetched data

  const mapRef = useRef(null)                                 // Variable to reference a div
  //const [initialized, setInitialized]=useState(false)       // flag to know if the map was initialized already

  // create the vector source and layer for markers
  const vectorSource = useMemo(()=> new VectorSource(),[])    // vector source
  const vectorLayer = useMemo(()=> new VectorLayer({source: vectorSource}),[vectorSource])  // layer

  useEffect(() => {
    const fetchEvents = async()=> {
      try{
        // fetch data
        const res = await fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events?api_key=5pt8Rzp61RlOYTUY5ViRaqLde3sNedNSV6DgBNEh')
        
        const {events} = await res.json()         // destructure events from json response
        setTemp(events)                           // save events data
      }catch(error){
        console.log('error fetching data:',error) // message in case of an fetching error
      }
    }
    fetchEvents()                                 // trigger the fetch function
  }, [])                                          // when empty it sets: run this effect every re-render of this component

  useEffect(()=>{
    if(tempData !== eventData){                   // if data received is different from stored data
      setEventData(tempData)                      // save validated data as data for the atmospheric events
      console.log(eventData)
    }

    if (!mapRef.current) return                   // prevents the map to re-render if the map's div already rendered
    //if(tempData !== eventData)return
    
    // Get previous stored values
    const storedZoom = localStorage.getItem('mapZoom')
    const storedCenter = localStorage.getItem('mapCenter')
    
    // use stored or default values
    const initialZoom = storedZoom ? parseFloat(storedZoom) : 5
    const initialCenter = storedCenter ? JSON.parse(storedCenter) : [0,0]

    // initialize the map and center it at [lat, long]
    const map = new Map({
      layers: [
        new TileLayer({
          preload: Infinity,
          source: new OSM()
        })
      ],
      view: new View({
        center: initialCenter,
        zoom: initialZoom
      }),
      target: mapRef.current,
    })

    // get the coordinates for each event and add an icon
    // for each pair of  coordinates, into the vector source
    eventData.forEach(ev =>{
      if(ev.categories[0].id===10){                 // if the id corresponds with "severe storms"
              
        // create a new feature on the event coordinates
        const feature = new Feature({
          geometry: new Point(fromLonLat(ev.geometries[0].coordinates))
        })
              
        // add an icon to the feature
        feature.setStyle(
          new Style({
            image: new Icon({
              anchor: [0.5, 1],
              src: 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" id="hurricane" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color"><path id="primary" d="M15.26,7.55a8.6,8.6,0,0,1,1.13,0,1,1,0,0,0,.22-2,9.92,9.92,0,0,0-5.44.94A8,8,0,0,1,17,4a1,1,0,0,0,0-2A10,10,0,0,0,7.56,8.74a7.14,7.14,0,0,1,0-1.13,1,1,0,0,0-.88-1.1,1,1,0,0,0-1.11.88,10,10,0,0,0,.93,5.43A8,8,0,0,1,4,7,1,1,0,0,0,2,7a10,10,0,0,0,6.74,9.44,7.14,7.14,0,0,1-1.13,0,1,1,0,0,0-.22,2,10.51,10.51,0,0,0,1.12.06,9.94,9.94,0,0,0,4.33-1A8,8,0,0,1,7,20a1,1,0,0,0,0,2,10,10,0,0,0,9.44-6.74,7.14,7.14,0,0,1,0,1.13,1,1,0,0,0,.88,1.1h.11a1,1,0,0,0,1-.89,10,10,0,0,0-.93-5.43A8,8,0,0,1,20,17a1,1,0,0,0,2,0A10,10,0,0,0,15.26,7.55Z" style="fill: rgb(0, 0, 0);"></path></svg>'),
              //src: 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/></svg>'),
              scale: 0.05,
              //scale:1.5,
              color: '#3B82F6'
            })
          })
        )
        vectorSource.addFeature(feature)           // add the new marker to the vector source
      }
    })
    map.addLayer(vectorLayer)                      // add the new layer to the map

    // Store view changes
    map.getView().on('change', () => {
      const view = map.getView();
      localStorage.setItem('mapZoom', view.getZoom()?.toString() || '')
      localStorage.setItem('mapCenter', JSON.stringify(view.getCenter()))
    })

    // clean up function
    return(()=>{
      map.setTarget(undefined)
    })
  },[tempData])                                     // set: render when eventData changes

  // return what will be rendered when required
  return (
    <div ref={mapRef} className="flex-grow" style={{ height: 'calc(100vh - 200px)' }}></div>
  )
}

export default MapComponent