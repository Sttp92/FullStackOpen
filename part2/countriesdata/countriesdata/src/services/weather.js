import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5'
const api_key = import.meta.env.VITE_WEATHER_API_KEY

const getCapitalWeather = (coordinates) => {
    const request = axios.get(`${baseUrl}/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
}

export default {
    getCapitalWeather
}