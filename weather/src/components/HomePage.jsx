// import { data } from "autoprefixer";
import { useState } from "react";
import DetailCard from "./DetailCard";
import Header from "./Header";
import Map from "./Map";
import SummaryCard from "./SummaryCard";
// import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Link } from "react-router-dom";

function HomePage() {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [noData, setNoData] = useState("No Data Yet");
  const [noMap, setNoMap] = useState("No Destination, No Map");
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState("Unknown location");
  // const [map, setMap] = useState([]);

  const [weatherIcon, setWeatherIcon] = useState(
    `${process.env.REACT_APP_ICON_URL}10n@2x.png`
  );

  const handleChange = (input) => {
    const { value } = input.target;
    setSearchTerm(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(searchTerm);
  };

  const getWeather = async (location) => {
    setWeatherData([]);
    let how_to_search =
      typeof location === "string"
        ? `q=${location}`
        : `lat=${location[0]}&lon=${location[1]}`;

    try {
      let res = await fetch(`${process.env.REACT_APP_URL + how_to_search}
      &appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`);
      let data = await res.json();
      if (data.cod != 200) {
        setNoData("Location Not Found");
        setNoMap("No Location, No Map");
        return;
      }
      setWeatherData(data);
      setCity(`${data.city.name}, ${data.city.country}`);
      setWeatherIcon(
        `${
          process.env.REACT_APP_ICON_URL + data.list[0].weather[0]["icon"]
        }@4x.png`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const myIP = (location) => {
    const { latitude, longitude } = location.coords;
    getWeather([latitude, longitude]);
  };

  return (
    <div className="flex items-start justify-center w-screen h-screen">
      <div className="flex w-3/4 rounded-3xl shadow-xl m-auto bg-gray-100 md:hover:scale-105  transition-all duration-50 ease-in-out">
        <div className="bg-[url('./assets/R.jfif')] bg-no-repeat bg-cover object-cover h-80 lg:h-full lg:w-full w-3/4 p-5 rounded-3xl lg:bg-contain">
          <div className="flex items-center justify-center">
            <h3
              className="my-auto mr-auto text-xl my-color font-bold shadow-md py-1 px-3 
              rounded-md bg-white bg-opacity-30"
            >
              forecast
            </h3>
            <div className="flex p-2 text-gray-100 bg-gray-600 bg-opacity-30 rounded-lg">
              <i className="fa fa-map my-auto" aria-hidden="true"></i>
              <div className="text-right">
                <p className="font-semibold text-sm ml-2">{city}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-white text-2xl">We show you only the truth</h1>
            <hr className="h-1 bg-white w-1/4 rounded-full my-5" />
            <form
              noValidate
              onSubmit={handleSubmit}
              className="flex justify-center w-full"
            >
              <input
                type="text"
                placeholder="Enter location"
                className="relative rounded-xl py-2 px-3 w-2/3 bg-gray-300 bg-opacity-60 text-white placeholder-gray-200"
                onChange={handleChange}
                required
              />
              <button type="submit" className="z-10">
                <i
                  className="fa fa-search text-white -ml-10 border-l my-auto z-10 cursor-pointer p-3"
                  aria-hidden="true"
                  type="submit"
                ></i>
              </button>
              <i
                className="fa fa-map-marker-alt my-auto cursor-pointer p-3 text-white"
                aria-hidden="true"
                onClick={() => {
                  navigator.geolocation.getCurrentPosition(myIP);
                }}
              ></i>
            </form>
          </div>
          {weatherData.length === 0 ? (
            <h1 className="text-gray-300 text-4xl my-color2 font-bold uppercase">
              {noMap}
            </h1>
          ) : (
            <div className="flex flex-col  mx-auto">
              <Map data={weatherData} />
              <Link to="/map">
                <button className="cursor-pointer shadow-xl px-2 hover:bg-red-400 hover:text-white hover:rounded-3xl md:hover:scale-105 transition-all duration-50 ease-in-out">
                  CLICK HERE TO SEE {city.slice(0, -4).toUpperCase()}'s MAP
                </button>
                <img
                  className="w-100 h-300 object-fit mt-4 shadow-2xl hover:border-4 hover:border-red-400 hover:scale-110 transition-all duration-50 ease-in"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI9BRnhW0HuwfpaDE41BzU75qc_gfsUMIyIw&usqp=CAU"
                  alt=""
                />
              </Link>
            </div>
          )}
        </div>

        <div className="w-2/4 p-5 ">
          <Header />
          <div className="flex flex-col my-12 ">
            {weatherData.length === 0 ? (
              <div className="container p-4 flex items-center justify-center h-1/3 mb-auto">
                <h1 className="text-gray-300 text-4xl my-color2 font-bold uppercase">
                  {noData}
                </h1>
              </div>
            ) : (
              <>
                <h1 className="text-5xl text-gray-800 mt-auto mb-4">Today</h1>
                <DetailCard weather_icon={weatherIcon} data={weatherData} />
                <h1 className="text-3xl text-gray-600 mb-4 mt-10">
                  More On {city}
                </h1>
                <ul className="grid grid-cols-2  gap-2">
                  {weatherData.list.map((days, index) => {
                    if (index > 0) {
                      return <SummaryCard key={index} day={days} />;
                    }
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
