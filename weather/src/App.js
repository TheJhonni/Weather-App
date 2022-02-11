import HomePage from "./components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapRouter from "./components/MapRouter";

function App() {
  return (
    <div className="bg-gradient-to-t from-white to-red-700 w-screen h-screen my-auto pt-5 lg:h-screen">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/map" element={<MapRouter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
