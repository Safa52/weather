import React, { useState,useRef } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");
  const inputref =useRef(null)

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city !== "") 
    { 
    setQuery({ q: city });
    inputref.current.focus();
    inputref.current.value = "";}
   
        
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
    //   toast.info("Fetching users location.");
      navigator.geolocation.getCurrentPosition((position) => {
        // toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="flex flex-row items-center justify-center my-6">
       <div className="flex flex-row  items-center  justify-center  mx-10">
        <button
          name="metric"
          className="text-xl text-white font-light transition  ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="text-xl text-white  mx-1">|</p>
        <button
          name="imperial"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>

      
      <div className="flex flex-row w-3/4 items-center justify-center space-x-1">
        <input
          value={city}
          ref={inputref}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search for city...."
          className=" font-light p-2  w-3/4 shadow-xl ml-[-50px] focus:outline-none rounded-md capitalize placeholder:lowercase"
        />
        <UilSearch
          size={30}
          className= " text-white cursor-pointer px-1 transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={30}
          className="text-white cursor-pointer px-1 transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>

     
    </div>
  );
}

export default Inputs;