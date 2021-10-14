import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.scss';

import { FaTemperatureHigh } from "@react-icons/all-files/fa/FaTemperatureHigh";
import { FaTemperatureLow } from "@react-icons/all-files/fa/FaTemperatureLow";

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);
  const [details, setDetails] = useState('');
  const [icon, setIcon] = useState('');
  const [main, setMain] = useState('');
  
  let getWeather = async (lat, long) => {
    require('dotenv').config();
    const apiKey = process.env.REACT_APP_OPEN_WEATHER_KEY;
    axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`)
      .then(res => {
        setWeather(res.data);
        setIcon(res.data.weather[0].icon);
        setMain(res.data.main);
        setDetails(res.data.weather[0])
        console.log(res.data)
      }, error => {
        alert("set .env file")
      })
  }
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    })
  }, [])

  if (location === false) {
    return (
      <div className="error">
          <h1>please accept location</h1>
      </div>
    );
  } else {
    
    const urlIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`

    return (
      <div className="weather-wrap">
          <p className="city-text">{weather.name}</p>
        <p className="details-text">{details.main}, {details.description}</p>
        <div className="main-wrap">
          <p className="temp-text">{main.temp}°</p>  
          <img src={urlIcon} alt="weather-icon"/>
        </div>
        <div className="values-wrap">
          <p className="values-text"><FaTemperatureLow/> Max: {main.temp_min}°</p>
          <p className="values-text"><FaTemperatureHigh/> Min: {main.temp_max}°</p>
        </div>
      </div>
    )
  }
}

export default App;
