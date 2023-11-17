import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import "@googlemaps/extended-component-library/route_overview.js";
import { DirectionsRenderer } from "@react-google-maps/api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const Map = ({ locations }) => {
  const mapContainerStyle = {
    height: "500px",
    width: "100%",
  };

  const center = {
    lat: 25.276987,
    lng: 51.520008,
  };

  const mapOptions = {
    width: "100%",
    mapTypeId: "satellite", // Set the map type to satellite
  };

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [clickedMarker, setClickedMarker] = useState(null);
  const [directions, setDirections] = useState(null);
  const [pointA, setPointA] = useState(null);
  const [selectingPointA, setSelectingPointA] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState({
    address: "",
    latLng: null,
  });

  const handleClick = (e) => {
    const clickedLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    if (selectingPointA) {
      setPointA(clickedLocation);
      setSelectingPointA(false);
    } else {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: pointA,
          destination: clickedLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`Directions request failed: ${status}`);
          }
        }
      );

      setPointA(null);
      setSelectingPointA(true);
    }
  };

  const handleSelect = async (address) => {
    const results = await geocodeByAddress(address);
    console.log(results, "results");

    const latLng = await getLatLng(results[0]);
    console.log(latLng, "latLng");
    setSelectedPlace({ address, latLng });
  };

  const handleReset = () => {
    setSelectedLocation(null);
    setClickedMarker(null);
    setDirections(null);
    setPointA(null);
    setSelectingPointA(true);
    setSelectedPlace({ address: "", latLng: null });
  };

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
        options={mapOptions}
        draggable={false}
        onClick={(e) => handleClick(e)}
        mapTypeControl={true}
      >
        {pointA && <Marker position={pointA} label="A" />}

        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: "red",
              },
            }}
          />
        )}

        {clickedMarker && (
          <InfoWindow position={clickedMarker.coordinates}>
            <div>
              <h3>{clickedMarker.name}</h3>
            </div>
          </InfoWindow>
        )}

        {selectedPlace && <Marker position={selectedPlace?.latLng} label="B" />}
      </GoogleMap>

      <PlacesAutocomplete
        value={selectedPlace?.address}
        onChange={(value) => setSelectedPlace({ address: value })}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: "Search Places" })} />
            <div>
              {console.log(getInputProps, "suggestions")}
              {suggestions &&
                suggestions.map((suggestion) => (
                  <div
                    key={suggestion.placeId}
                    {...getSuggestionItemProps(suggestion)}
                  >
                    {suggestion.description}
                  </div>
                ))}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      <button onClick={handleReset}>Reset</button>
    </>
  );
};

export default Map;
