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
const MapComponent = () => {
  const [eventData, setEventData]=useState([])
  const [loading, setLoading]=useState(false)
  
  const [center, setCenter] = useState(fromLonLat([0, 0]))
  const [zoom, setZoom] = useState(5)

  // set initial map objects
  const view = useMemo(()=> new View({
    center: center,
    zoom: zoom
  }),[center,zoom])

  //const mapRef = useRef<HTMLDivElement|undefined>(null);
  const mapRef = useRef(null)

  // initialize the map and center it at [lat, long]
  const map = useState( new Map({
    layers: [
      new TileLayer({
        preload: Infinity,
        source: new OSM()
      })
    ],
    view: view,
    target: mapRef.current,
  }))

  // create the vector source and layer for markers
  const vectorSource = useMemo(()=> new VectorSource(),[])
  const vectorLayer = useMemo(()=> new VectorLayer({source: vectorSource}),[vectorSource])  

  useEffect(() => {

    // ---------------------------------------
    const fetchEvents = async()=> {
      setLoading(true)
      try{
        const res = await fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events?api_key=5pt8Rzp61RlOYTUY5ViRaqLde3sNedNSV6DgBNEh');
        //const res = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events?api_key=5pt8Rzp61RlOYTUY5ViRaqLde3sNedNSV6DgBNEh');
        
        const {events} = await res.json()
        setEventData(events)
        setLoading(false)
        console.log(eventData)

      }catch(error){
        console.log('error fetching data:',error)
      }
    }
    fetchEvents() // fetch the data from the url
    // --------------------------------------------------------
    if (!mapRef.current) return;

    // initialize the map and center it at [lat, long]
    // const map = new Map({
    //   layers: [
    //     new TileLayer({
    //       preload: Infinity,
    //       source: new OSM()
    //     })
    //   ],
    //   view: view,
    //   target: mapRef.current,
    // })
    // ---------------------------------------------------------

    // get the coordinates for each event add an icon,
    // for each pair of  coordinates, into the vector source
    //const updateMap = () =>{
      eventData.forEach(ev =>{
        // if the id corresponds with the type of event
        // we're looking for
        if(ev.categories[0].id===10){ 
            
          // create a new feature on the event coordinates
          const feature = new Feature({
            geometry: new Point(fromLonLat(ev.geometries[0].coordinates))
              
          });
            
          // add an icon to the feature
          feature.setStyle(
            new Style({
              image: new Icon({
                anchor: [0.5, 1],
                //src: 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" id="hurricane" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color"><path id="primary" d="M15.26,7.55a8.6,8.6,0,0,1,1.13,0,1,1,0,0,0,.22-2,9.92,9.92,0,0,0-5.44.94A8,8,0,0,1,17,4a1,1,0,0,0,0-2A10,10,0,0,0,7.56,8.74a7.14,7.14,0,0,1,0-1.13,1,1,0,0,0-.88-1.1,1,1,0,0,0-1.11.88,10,10,0,0,0,.93,5.43A8,8,0,0,1,4,7,1,1,0,0,0,2,7a10,10,0,0,0,6.74,9.44,7.14,7.14,0,0,1-1.13,0,1,1,0,0,0-.22,2,10.51,10.51,0,0,0,1.12.06,9.94,9.94,0,0,0,4.33-1A8,8,0,0,1,7,20a1,1,0,0,0,0,2,10,10,0,0,0,9.44-6.74,7.14,7.14,0,0,1,0,1.13,1,1,0,0,0,.88,1.1h.11a1,1,0,0,0,1-.89,10,10,0,0,0-.93-5.43A8,8,0,0,1,20,17a1,1,0,0,0,2,0A10,10,0,0,0,15.26,7.55Z" style="fill: rgb(0, 0, 0);"></path></svg>'),
                src: 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/></svg>'),
                //scale: 0.05,
                scale:1.6,
                color: '#3B82F6'
              })
            })
          )
          console.log(ev.geometries[0].coordinates)
          
          // add the new marker to the source list
          vectorSource.addFeature(feature);
        }
      })
    //}

    // update the center of the map by getting the center of the view
    map.on("moveend", () => {
      setCenter(map.getView().getCenter());
      setZoom(map.getView().getZoom());
    })

    // add the new layer to the map
    map.addLayer(vectorLayer);

    map.getView.animate({ zoom: zoom }, { center: center }, { duration: 2000 })

    // Set up interval for updates
    // const interval = setInterval(updateMap, 12000)
    // const dataInterval = setInterval(fetchEvents,5000)
    
    return () => {
      // clearInterval(interval)
      // clearInterval(dataInterval)
      map.setTarget(null)
    };
  }, [eventData,vectorLayer,vectorSource,map,center,zoom])

  return (
    <div ref={mapRef} className="flex-grow" style={{ height: 'calc(100vh - 200px)' }}></div>
  )
}

export default MapComponent