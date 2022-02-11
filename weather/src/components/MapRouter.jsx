import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
// import getCenter from "geolib/es/getCenter";
import "mapbox-gl/dist/mapbox-gl.css";

function Map() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 10,
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
