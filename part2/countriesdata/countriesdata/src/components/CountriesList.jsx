const CountriesList = ({ filteredCountries, handleShowData }) => {
    return (
      <>
        {filteredCountries.length > 10
        ? <p><strong>Too many matches!</strong> Please specify another filter</p>
        : 
          <>
            <h2>Countries found</h2>
            {filteredCountries.map(country => <p key={country.name.common}>{country.name.common} <button onClick={() => handleShowData(country.name.common)}>Show Data</button></p>)}
          </>  
        }
      </>
    )
}

export default CountriesList