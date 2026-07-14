 import { useState } from "react";
import axios from "axios";
import { WiCloud, WiRain, WiDaySunny, WiThunderstorm, WiSnow } from "react-icons/wi";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const getWeatherIcon = (condition)=>{
  
    switch(condition.toLowerCase()){
      case "clear":
        return <WiDaySunny size ={180} color="#FDB813"/>;

      case "clouds":
        return <WiCloud size ={180} color="#4A90E2"/>;

      case "rain":
        return <WiRain size ={180} color="#3498DB"/>; 

      case "thunderstorm":
        return <WiThunderstorm size ={180} color="#9B59B6"/>; 

      case "snow":
        return <WiSnow size ={180} color="#9B59B6"/>; 
        
      default:
        return <WiCloud size ={180} color="#4A90E2"/>; 
      
    }
  }
  
  const getWeather = async () => {
    if (!city) return;

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d23c133703376a4728f88df0c54fde7f&units=metric`
      );

      setWeather(res.data);
    } catch  {
      alert("City Not Found");
    }
  };
  
  return (
    <div className="weather-bg">
      <div className="container">

        <div className="weather-box">

          <h1 className="title">
            <i className="bi bi-cloud-rain"></i>
            Weather App
          </h1>

          <div className="search-box">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Enter City Name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <button
              className="btn search-btn"
              onClick={getWeather}>
              <i className="bi bi-search"></i>
              Search
            </button>
          </div>

          {weather && (
            <div className="weather-card">

              <div className="row align-items-center">

                <div className="col-md-6">

                  <h2>{weather.name}</h2>

                  <h1 className="temp">
                    {Math.round(weather.main.temp)}°C
                  </h1>

                  <p className="desc">
                    {weather.weather[0].description}
                  </p>

                </div>

                <div className="col-md-6 text-center">

                 <div className="weather-icon">
                  {getWeatherIcon(weather.weather[0].main)}
                
                </div>

                </div>

              </div>

              <hr />

              <div className="row text-center">

                <div className="col-md-3 info-box">
                  <i className="fas fa-temperature-high text-primary"></i>
                   
                  <p>Feels Like</p>
                  <h5>{Math.round(weather.main.feels_like)}°C</h5>
                </div>

                <div className="col-md-3 info-box">
                  <i className="fas fa-tint text-info"></i>
                  <p>Humidity</p>
                  <h5>{weather.main.humidity}%</h5>
                </div>

                <div className="col-md-3 info-box">
                  <i className="fas fa-wind text-success"></i>
                  <p>Wind</p>
                  <h5>{weather.wind.speed} m/s</h5>
                </div>

                <div className="col-md-3 info-box">
                <i className="fas fa-gauge-high text-danger"></i>
                <p>Pressure</p>
                  <h5>{weather.main.pressure} hPa</h5>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default App;