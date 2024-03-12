import { useState } from "react";
import TopBar from "./TopBar";
import GoogleMap from "./GoogleMap";

// utility function
const log = (...args) => console.log.apply(null, ["App -->", ...args]);

export default function App() {
  const [latlng, setLatlng] = useState({
    lat: -34.397,
    lng: 150.644,
  });
  const [zoom, setZoom] = useState(8);

  function reposition(event) {
    const { city } = event.target.dataset;

    switch (city) {
      case "tel aviv":
        setLatlng({ lat: 32.0042938, lng: 34.7615399 });
        break;
      case "london":
        setLatlng({ lat: 51.4567066, lng: -0.63450939 });
        break;
      case "paris":
        setLatlng({ lat: 48.8589633, lng: 2.5118416 });
        break;
      default:
        alert("Location not supported");
    }
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLatlng({ lat: latitude, lng: longitude });
    });
  };

  log(latlng);
  return (
    <div className="app">
      <TopBar>Google Maps Example in React</TopBar>
      <div className="hbox mb20">
        <button onClick={() => getLocation()}>Find my location</button>
        <button data-city="tel aviv" onClick={reposition}>
          Tel Aviv
        </button>
        <button data-city="london" onClick={reposition}>
          London
        </button>
        <button data-city="paris" onClick={reposition}>
          Paris
        </button>
        <input
          type="number"
          min="8"
          max="16"
          placeholder="8"
          onChange={(event) => setZoom(Number(event.target.value))}
        />
      </div>
      <GoogleMap lat={latlng.lat} lng={latlng.lng} zoom={zoom} />
      {/* <GoogleMap {...latlng} /> */}
    </div>
  );
}
