
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureDetails from "components/TempratureDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";


function App() {
  const [query, setQuery] = useState({q:''});
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
 
  

  useEffect(() => {
    const fetchWeather = async () => {
     
       const getdata =await getFormattedWeatherData({ ...query, units }).then((data) => {
       
       
        setWeather(data);
        
        
      })
    };
    if(query.q!=='')
     fetchWeather()
  }, [query, units ]);

  const formatBackground = () => {
    if (!weather) return "from-gray-200 to-white-700 opacity-75 ";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-800 to-blue-500  opacity-75";

    return "from-yellow-200 to-orange-700 opacity-75";
  };

  return (
    <div
      className={`container mx-auto  my-12  py-4  px-6 md:px-8  justify-center bg-gradient-to-br  h-fit shadow-xl shadow-gray-400  ${formatBackground()} `}
    > 
     
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      

      {weather ? (
       
        <div>
      
          <TimeAndLocation weather={weather} />
          <TemperatureDetails weather={weather} />
        
          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
        </div>
      ) : 
        <div className="flex items-center justify-center my-6">
        <p className="text-white drop-shadow-2xl font-extrabold text-lg ">
          ENTER LOCATION...
        </p>
      </div>

        }

    </div>
  );
}

export default App;