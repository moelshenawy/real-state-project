import React from "react";
import { GoogleMap, Marker } from "react-google-maps";
import { LoadScript } from "@react-google-maps/api";

const MyMapComponent = ({ isMarkerShown }) => {
  const mapContainerStyle = {
    height: "500px",
    width: "100%",
  };

  const defaultCenter = {
    lat: -34.397,
    lng: 150.644,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyC0fUYASQXlqfp1d5EFSIT7_0lg0_OIxq0">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={defaultCenter}
      >
        {isMarkerShown && <Marker position={defaultCenter} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MyMapComponent;
