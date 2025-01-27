import React, {useEffect, useState, useRef} from 'react'
import './weather.css'
import search_Icon from '../Assets/search.png'
import cloud_Icon from '../Assets/cloud.png'
import rain_Icon from '../Assets/rain.png'
import snow_Icon from '../Assets/snow.png'
import clear_Icon from '../Assets/clear.png'
import wind_Icon from '../Assets/wind.png' 
import humidity_Icon from '../Assets/humidity.png'
import drizzle_Icon from '../Assets/drizzle.png'
const weather = () => {
    const inputRef = useRef();

    const [weather, setWeatherData  ] = useState(false)

    const allIcons = {
        "04d": cloud_Icon,
        "04n": cloud_Icon,
        "01d": clear_Icon,
        "01n": clear_Icon,
        "10d": rain_Icon,
        "10n": rain_Icon,
        "13d": snow_Icon,
        "13n": snow_Icon,
        "09d": drizzle_Icon,
        "09n": drizzle_Icon,
    }

    const search = async (city) => {
        if(city === ""){
            alert("Please enter a city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            if(data.cod === "404"){
                setWeatherData(false);
                alert("City not found");
                return;
            }
            console.log(data);
            const Icon = allIcons[data.weather[0].icon] || clear_Icon;
            setWeatherData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                city: data.name,
                icon: Icon,
            })
        } catch (error) {
            setWeatherData(false);
            console.error("Please enter a valid city name");
        }
    }
    useEffect(() => {
        search("bangalore");
    }, [])

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search your city...' />
        <img src={search_Icon} alt="" onClick={() => search(inputRef.current.value)} />
      </div>
      {weather && <>
        <img src={weather.icon} alt="" className='weatherData-icon' />
        <p className='temperature'>{weather.temperature}°C</p>
        <p className='city'>{weather.city}</p>
        <div className="weather-data">
          <div className="col">
              <img src={humidity_Icon} alt="" />
              <div>
                  <p>{weather.humidity}%</p>
                  <span>Humidity</span>
              </div>
          </div>
          <div className="col">
              <img src={wind_Icon} alt="" />
              <div>
                  <p>{weather.wind}km/h</p>
                  <span>Wind Speed</span>
              </div>
          </div>
        </div>
      </>}
    </div>
  )
}

export default weather
