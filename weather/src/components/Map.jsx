import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Map({ data }) {
  console.log(data);
  const { lat, lon } = data.city.coord;

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "300%",
    latitude: lat,
    longitude: lon,
    zoom: 11,
  });

  console.log(data);

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
