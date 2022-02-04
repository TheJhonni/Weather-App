import React from "react";

function Header() {
  return (
    <ul className="flex justify-center mx-auto w-full font-bold">
      <li className="text-xs text-gray-800 mx-auto mr-6 border-b-2 border-red-400 cursor-pointer">
        Weather
      </li>
      <li className="text-xs text-gray-800 mr-6 alert-notice cursor-pointer border-b-2 hover:border-red-500">
        Alerts
      </li>
      <li className="text-xs text-gray-800 mr-6 cursor-pointer border-b-2 hover:border-red-500">
        Map
      </li>
      <li className="text-xs text-gray-800 cursor-pointer border-b-2 hover:border-red-500">
        News
      </li>
    </ul>
  );
}

export default Header;
