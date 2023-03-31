import React, { useState, useEffect } from "react";
import "./weather.css";
import cities from "./cities.json";

// import icons
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdCloudyNight,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,

} from "react-icons/bs";

import { BiNavigation } from "react-icons/bi";
import { TbTemperatureCelsius } from "react-icons/tb";

const Weather = () => {
 
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const cityCodes = cities.map((city) => city.CityCode);
    const cachedData = JSON.parse(localStorage.getItem("weatherData"));
    const cachedTimestamp = parseInt(
      localStorage.getItem("weatherDataTimestamp")
    );

    const apiurl = `https://api.openweathermap.org/data/2.5/group?id=${cityCodes.join(
      ","
    )}&units=metric&appid=ecb79ff5dd5dfd62ad850d3501d92fe5`;

    if (
      cachedData &&
      cachedTimestamp &&
      Date.now() - cachedTimestamp < 5 * 60 * 1000
    ) {
      setWeatherData(cachedData);
    } else {
      fetch(apiurl)
        .then((response) => response.json())
        .then((data) => {
          const extractedData = data.list.map((city) => ({
            id: city.id,
            name: city.name,
            country: city.sys.country,
            description: city.weather[0].description,
            visibility: city.visibility,
            feels_like: city.main.feels_like,
            humidity: city.main.humidity,
            speed: city.wind.speed,
            temp: city.main.temp,
            temp_min: city.main.temp_min,
            temp_max: city.main.temp_max,
            main:city.weather[0].main,
            sunrise: city.sys.sunrise,
            sunset: city.sys.sunset,
          }));
          setWeatherData(extractedData);
          console.log(extractedData);
        });
     }
  }, []);


  const date = new Date();

 
 
 
  return (
    <>
      <div className="background">
        <div class="CardContainer">
          {weatherData.map((city) => (  
            
            
            <div class="card p-0 m-0" key={city.name}>
            
              {/*Card top*/}
              <div className="back flex justify-between flex-row gap-y-2  text-white w-full p-4" 
              style=
                {{
                    "Clouds":{backgroundColor: "green"},    
                     "Haze": {backgroundColor: "red"},    
                     "Rain": {backgroundColor: "blue"},
                    "Clear":{backgroundColor: "lightblue"},
                    "Drizzle":{backgroundColor: "green"},
                    "Snow":{backgroundColor: "purple" },
                   "Thunderstorm":{backgroundColor: "yellow"},
                   "Mist":{backgroundColor: "yellow"},
                  
                }[city.main]}>


                {/*Card top Left*/}
                <div>
                  <div className="flex flex-col items-center gap--5  text-white">
                    {/*Country Name & Date*/}
                    <div>
                      <div className="text-2xl font-semibold">
                        {city.name}, {city.country}
                      </div>
                      <div>
                        {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                        {date.getUTCFullYear()}
                      </div>
                    </div>
                    {/*Icon & description*/}
                    <div className="flex flex-row pt-3 ">
                      <div className="text-[40px]">
                     {
                      {
                        "Clouds":<IoMdCloudy />,    
                         "Haze": <BsCloudHaze2Fill />,    
                         "Rain": <IoMdRainy className='text-[#31cafb]'/>,
                        "Clear":<IoMdSunny className='text-[#ffde33]' />,
                        "Drizzle":<BsCloudDrizzleFill className='text-[#31cafb]' />,
                        "Snow":<IoMdSnow className='text-[#31cafb]' />,
                       "Thunderstorm":<IoMdThunderstorm />,
                       "Mist":<IoMdCloudyNight />,  
                    }[city.main]
                     }



                      </div>
                      <div className="flex justify-center items-center ml-2">
                        <div className="capitalize text-center">
                          {city.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*Card top Right*/}
                <div>
                  <div className="flex flex-col items-center gap--5  text-white">
                    {/*Card top Right- temp*/}
                    <div className="flex justify-center items-center">
                      {/* temp */}
                      <div className="text-[60px] leading-none font-light">
                        {parseInt(city.temp)}
                      </div>
                      {/* celsius icon */}
                      <div className="text-4xl">
                        <TbTemperatureCelsius />
                      </div>
                    </div>

                    {/*Card top Right- temp-min*/}
                    <div className="flex flex-row pt-3 gap-x-1 ">
                      
                      <div className="flex justify-center items-center ml-2">
                        <div className="capitalize text-center">
                          Temp Min
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                      {/* temp */}
                      <div className="text-[15px] leading-none font-light">
                        {parseInt(city.temp_min)}
                      </div>
                      {/* celsius icon */}
                      <div className="text-base">
                        <TbTemperatureCelsius />
                      </div>
                    </div>
                    </div>

                    {/*Card top Right- temp-max*/}
                    <div className="flex flex-row pt-0 gap-x-1 ">
                      
                      <div className="flex justify-center items-center ml-2">
                        <div className="capitalize text-center">
                          Temp Max
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                      {/* temp */}
                      <div className="text-[15px] leading-none font-light">
                        {parseInt(city.temp_max)}
                      </div>
                      {/* celsius icon */}
                      <div className="text-base">
                        <TbTemperatureCelsius />
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
         
              {/*Card bottom*/}
              <div className="down flex flex-row gap-y-2 gap-x-5 text-white bg-black/80 w-full">

                     {/*Card bottom left*/}
                <div className="flex flex-col justify-between ml-4 mb-4 mt-4 ">
                  <div className="flex items-center gap-x-2 text-sm	" >
                    {/* icon */}
                    <div className="text-[20px] text-xs	">
                      <BsEye/>
                    </div>
                    <div>
                     Visibility{" "}
                      <span className="ml-2">{city.visibility / 1000} km</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2 text-sm	">
                    {/* icon */}
                    <div className="text-[20px]">
                      <BsThermometer />
                    </div>
                    <div className="flex">
                      Feels like
                      <div className="flex ml-2">
                        {parseInt(city.feels_like)}
                        <TbTemperatureCelsius />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2 text-sm	">
                    {/* icon */}
                    <div className="text-[20px]">
                      <BsWater />
                    </div>
                    <div>
                      Humidity
                      <span className="ml-2">{city.humidity} %</span>
                    </div>
                  </div>
                </div>

                {/*Card bottom middle*/}
                <div className="flex flex-col justify-between mb-4 mt-4 border-x-2 border-indigo-50 px-2">
                <div className="flex items-center justify-center text-[25px]">
                      <BiNavigation />
                    </div>
                  <div className="flex items-center gap-x-2 text-sm	">                
                    <div>
                      Wind <span className="ml-2">{city.speed} m/s</span>
                    </div>
                  </div>
                </div>
                
              

              {/*Card bottom right*/}
              <div className="flex flex-col justify-between mr-4 mb-4 mt-4  text-sm	 ">
                <div>
                  
                      Sunset:{new Date(city.sunset * 1000).toLocaleTimeString()}      
                </div>
                <div>                             
                    Sunset:{new Date(city.sunrise * 1000).toLocaleTimeString()}   
                  </div>
                  </div>



              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Weather;
