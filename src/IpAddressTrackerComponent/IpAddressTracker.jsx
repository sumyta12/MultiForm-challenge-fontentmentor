import "./IpAddressCss.css";
import {Secret_API_KEY} from './../Constant'
import { MapContainer, TileLayer,  Marker, Popup } from "react-leaflet";
import { FaChevronRight } from "react-icons/fa6";
import { useState } from "react";

const IpAddressTracker = () => {
  const [userclick, setUserClick] = useState("");
  const [ipAddressinfo, setIpAddress] = useState({
    ip: "8.8.8.8",
    location: {
      country: "US",
      region: "California",
      city: "Mountain View",
      lat: 37.40599,
      lng: -122.078514,
      postalCode: "94043",
      timezone: "-07:00",
      geonameId: 5375481,
    },
    isp: "Google LLC",
  });

  function handlerGiveIpaddress(event) {
    setUserClick(event.target.value);
  }

  function handlerSubmitInputfrom(event) {
    event.preventDefault();

    async function getData() {
      const url = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${Secret_API_KEY}&ipAddress=${userclick}`
      );
      if (url.ok) {
        const getResponse = await url.json();
        setIpAddress(getResponse);
      } else {
        setIpAddress({});
      }
    }
    getData();
  }

  const IpAddressInfoTextRender = ({ ip = "", location = {}, isp = "" }) => {
    const { region = "", city = "", timezone = "" } = location;

    return (
      <div className="data">
        <div className="data__content data__ip">
          <h4>IP Address</h4>
          <p className="data__ip__text">{ip}</p>
        </div>

        <div className="data__content data__location">
          <h4>Location</h4>
          <p className="data__location__text">{`${region} , ${city}`}</p>
        </div>

        <div className="data__content data__time">
          <h4>Timezone</h4>
          <p className="data__time__text">UTC {timezone}</p>
        </div>

        <div className="data__content data__isp">
          <h4>ISP</h4>
          <p className="data__isp__text">{isp}</p>
        </div>
      </div>
    );
  };

  const Ipshadow = () => {
    return (
      <div className="data">
        there is no data found sorry try another Ip address
      </div>
    );
  };

  const MapDesignRender = ({
    lat = "51.505",
    lng = "-0.09",
    city = "",
    postalCode = "",
  }) => {
    return (
      <MapContainer
        className="map--Container"
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]}>
          <Popup className="pop--css">
            {city && `city : ${city}  postalCode : ${postalCode}`}
          </Popup>
        </Marker>
      </MapContainer>
    );
  };

  return (
    <div>
      <div className="header"></div>
      <form className="search-form" onSubmit={handlerSubmitInputfrom}>
        <input
          type="text"
          placeholder="Search for any IP address or domain"
          required=""
          className="input-field"
          onBlur={handlerGiveIpaddress}
        />

        <button type="submit" className="submit-btn">
          <FaChevronRight className="icone--css" />
        </button>
      </form>

      {Object.keys(ipAddressinfo).length === 0 ? (
        <Ipshadow />
      ) : (
        <IpAddressInfoTextRender {...ipAddressinfo} />
      )}

      <div></div>

      <div>
        <div className="map--main--div">
          {<MapDesignRender {...ipAddressinfo?.location} />}
        </div>
      </div>
    </div>
  );
};

export default IpAddressTracker;
