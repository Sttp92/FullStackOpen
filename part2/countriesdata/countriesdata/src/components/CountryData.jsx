import { useState, useEffect } from "react"
import getCapitalWeatherService from "../services/weather"

const WeatherData = ({ data }) => {
    const weatherIcon = data.weather[0].icon
    return (
        <>
            <p><em><strong>{data.weather[0].main}</strong>, {data.weather[0].description}</em></p>
            <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="Weather Icon"/>
            <p>Temperature: {data.main.temp}°C</p>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Wind: {data.wind.speed}m/s</p>
        </>
    )
}

const CountryData = ({ countryData }) => {
    const [weatherData, setWeatherData] = useState(null)

    const languajesArray = Object.values(countryData.languages)
    const capitalCoordinates = Object.values(countryData.capitalInfo).pop()

    useEffect(() => {
      getCapitalWeatherService
        .getCapitalWeather(capitalCoordinates)
        .then(weatherDataRequested => {
            setWeatherData(weatherDataRequested)
        })
    }, [])
    
    return (
      <div>
        <h2>{countryData.name.common}</h2>
        <p>Capital: {countryData.capital}</p>
        <p>Continent: {countryData.continents}</p>
        <h4>Languages</h4>
        <ul>
          {languajesArray.map(lan => <li key={lan}>{lan}</li>)}
        </ul>
        <h4>Flag</h4>
        <img src={countryData.flags.png} alt="Flag"/>
        <h4>{countryData.capital} Weather Data</h4>
        {weatherData
            ? <WeatherData data={weatherData} />
            : null
        }
      </div>
    )
}

export default CountryData