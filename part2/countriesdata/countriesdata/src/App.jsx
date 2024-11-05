import { useState, useEffect } from "react"
import countriesService from "./services/countries"
import CountriesList from "./components/CountriesList"
import CountryData from "./components/CountryData"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [country, setCountry] = useState('')

  const handleSearchChange = (event) => {
    if (event.target.value !== '') {
      const results = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
      setFilteredCountries(results)
    } else { setFilteredCountries([]) }
    setCountry(event.target.value)
  }

  const handleShowData = (countryName) => {
    const selectedCountry = countries.filter(country => country.name.common === countryName)
    setFilteredCountries(selectedCountry)
  }

  useEffect(() => {
    countriesService
      .getAll()
      .then(countriesRequested => {
        setCountries(countriesRequested)
      })
  },[])

  return (
    <>
      <h1>Countries Data</h1>
      <p>Find the country you want to know about</p>
      {countries.length > 1
        ? <input name="countriesInput" value={country} placeholder="Ready!" onChange={handleSearchChange}/>
        : <p><em>Loading data...</em></p>}
      {filteredCountries.length > 0
        ? (
            filteredCountries.length === 1
              ? <CountryData countryData={filteredCountries[0]}/>
              : <CountriesList filteredCountries={filteredCountries} handleShowData={handleShowData} />
          )
        : null}
    </>
  )
}

export default App