import { useState } from "react";
import { ReactComponent as Icon } from "../images/icon-arrow.svg";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Loader from "./Loader";

function Container() {
  const [ipAddress, setIpAddress] = useState("");
  const [location, setLocation] = useState("Brooklyn, NY 10001");
  const [country, setCountry ] = useState("United States");
  const [timezone, setTimezone] = useState("-05:00");
  const [isp, setIsp] = useState("SpaceX Starlink");
  const [lat, setLat] = useState("51.505");
  const [lng, setLng] = useState("-0.09");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    let url = "https://geo.ipify.org/api/v1";
    let ip = ipAddress;
    let api_key = process.env.REACT_APP_API_KEY;

    let response = await fetch(`${url}?apiKey=${api_key}&ipAddress=${ip}`);
    let data = await response.json();
    console.log("hello", data);

    setLocation(data.location.city);
    setCountry(data.location.country);
    setTimezone(data.location.timezone);
    setIsp(data.isp);
    setLat(data.location.lat);
    setLng(data.location.lng);
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <form className="container" onSubmit={handleSubmit}>
        <h1>IP Address Tracker</h1>
        <div className="searchBar">
          <input
            type="text"
            value={ipAddress}
            className="search"
            placeholder="Search for any IP address or domain"
            onChange={(e) => setIpAddress(e.target.value)}
          />
          <div>
            <button className="arrowBtn" type="submit">
              <Icon />
            </button>
          </div>
        </div>
      </form>
      <div className="map">
        <MapContainer
          style={{ height: "100%", width: "100%" }}
          center={[lat, lng]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]}>
            <Popup>{location} {country}</Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="displayCard">
        <div className="cardContent">
          <p>IP ADDRESS</p>
          <h2>{ipAddress ? ipAddress : "192.212.174.101"}</h2>
        </div>
        <div className="cardContent">
          <p>{location}</p>
          <h2>
            {country} {location}
          </h2>
        </div>
        <div className="cardContent">
          <p>TIMEZONE</p>
          <h2>UTC{timezone}</h2>
        </div>
        <div className="cardContent">
          <p>ISP</p>
          <h2>{isp}</h2>
        </div>
      </div>
    </>
  );
}

export default Container;
