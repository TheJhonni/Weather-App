import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import "mapbox-gl/dist/mapbox-gl.css";

function Map({ data }) {
  // const [selectedLocation, setSelectedLocation] = useState({});

  // const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "50%",
    height: "50%",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/thejhonni/ckz16fpsn005u14s03jyvdk0g"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    ></ReactMapGL>
  );
}

export default Map;
