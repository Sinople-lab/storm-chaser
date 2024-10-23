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
import { useState, useEffect, useRef } from 'react';
// 
// locations test
// const coordinates = [
//   [-74.3093456, 40.6975399],
//   [-99.1332, 19.4326],
//   [139.4112196, 35.6677944]
// ];
// const events= [
//   {
//     "id": "EONET_11729",
//     "title": "Tropical Storm Kristy",
//           "description": "",
//     "link": "https://eonet.gsfc.nasa.gov/api/v2.1/events/EONET_11729",
//     "categories": [
//       {
//         "id": 10,
//         "title": "Severe Storms"
//       }
//     ],
//     "sources": [
//       {
//         "id": "JTWC",
//         "url": "https://www.metoc.navy.mil/jtwc/products/ep1224.tcw"
//       },
//       {
//         "id": "NOAA_NHC",
//         "url": "https://www.nhc.noaa.gov/archive/2024/KRISTY.shtml"
//       }
    
//     ],
//     "geometries": [
//       {
//         "date": "2024-10-21T18:00:00Z",
//         "type": "Point", 
//         "coordinates": [ -101.4, 13.4 ]
//       },
//       {
//         "date": "2024-10-21T21:00:00Z",
//         "type": "Point", 
//         "coordinates": [ -102, 13.5 ]
//       },
//       {
//         "date": "2024-10-22T00:00:00Z",
//         "type": "Point", 
//         "coordinates": [ -102.7, 13.7 ]
//       },
//       {
//         "date": "2024-10-22T06:00:00Z",
//         "type": "Point", 
//         "coordinates": [ -104, 14.1 ]
//       },
//       {
//         "date": "2024-10-22T12:00:00Z",
//         "type": "Point", 
//         "coordinates": [ -106, 14.5 ]
//       },
//       {
//         "date": "2024-10-22T18:00:00Z",
//         "type": "Point", 
//         "coordinates": [ -107.7, 14.6 ]
//       }
    
//     ]
//   },
// ]
//
const MapComponent = () => {
  const [eventData, setEventData]=useState([])
  const [loading, setLoading]=useState(false)

  //const mapRef = useRef<HTMLDivElement|undefined>(null);
  const mapRef = useRef(null);

  // create the vector source and layer for markers
  const vectorSource = new VectorSource()
  const vectorLayer = new VectorLayer({source: vectorSource});

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

    if (!mapRef.current) return;

    // initialize the map and center it at [-74.3093456, 40.6975399]
    const map = new Map({
      layers: [
        new TileLayer({
          preload: Infinity,
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([-74.3093456, 40.6975399]),
        zoom: 5
      }),
      target: mapRef.current,
    });

    // get the coordinates for each event add an icon,
    // for each pair of  coordinates, into the vector source
    eventData.forEach(ev =>{
    //events.forEach(ev =>{
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
              scale:1,
              color: '#3B82F6'
            })
          })
        );
        console.log(ev.geometries[0].coordinates)

        // add the new marker to the source list
        vectorSource.addFeature(feature);
      }

      // vectorSource.addFeature(feature);
    });

    // add the new layer to the map
    map.addLayer(vectorLayer);

    return () => {
      map.setTarget(null);
    };
  }, [eventData,vectorLayer,vectorSource]);

  return (
    <div ref={mapRef} className="flex-grow" style={{ height: 'calc(100vh - 200px)' }}></div>
  )
}

export default MapComponent