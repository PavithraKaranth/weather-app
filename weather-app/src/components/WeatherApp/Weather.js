import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";

export default function WeatherApp() {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("");
  const [icon, setIcon] = useState(null);
  const [error, setError] = useState("");
  const [time, setTime] = useState("");

  
  useEffect(() => {
    axios.get( `https://api.openweathermap.org/data/2.5/weather?q=mangalore&units=imperial&appid=83dc2e9a8e5ae5be71b3d639664d624c`).then((res) => {
      setWeather(res.data);
      
      console.log(res.data);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=83dc2e9a8e5ae5be71b3d639664d624c`,
      )
      .then((res) => {
        console.log(res.data);
        setWeather(res.data);
        setIcon(
          `http://openweathermap.org/img/w/${res.data.weather[0].icon}.png`,
        );
        setTime(new Date().toLocaleString());
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Invalid city name. Please try again");
      });
  }

  return (
    <div className="container">
      <h3>Weather App</h3>
      <div className="container__search">
        <input
          className="container__input"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Enter City Name"
          type="text"
        />
        <button className="container__button" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {error && <p className="container__error">{error}</p>}

      <div className="container__time">
        {city && (
          <>
            <p className="container__data">{time}</p>
          </>
        )}
      </div>
      
      <div className="container__temp">
        {weather.name ? <h1> Location - {weather.name}</h1> : " "}
      </div>

     
      <div className="container__weather-data">
        <div className="container__temp">
          {weather.main ? <h1>Temperature - {weather.main.temp}°F</h1> : " "}
        </div>

        {weather.name !== undefined && (
          <div className="container__wind-humidity">
            <div className="container__humidity">
              {weather.main ? (
                <p className="container__data">
                  Humidity - {weather.main.humidity}%
                </p>
              ) : (
                " "
              )}
            </div>

            <div className="container__wind">
              {weather.wind ? (
                <p className="container__data">
                  Wind Speed - {weather.wind.speed} MPH
                </p>
              ) : (
                " "
              )}
            </div>
            <div className="container__icon">
              {icon && <img src={icon} alt="weather" />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
