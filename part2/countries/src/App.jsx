import { useEffect, useState } from "react"
import axios from "axios"
const API_KEY = import.meta.env.VITE_API_KEY

const CountryDetail = ({ country }) => {
  const [temperature, setTemperature] = useState(null)
  const [windVel, setWindVel] = useState(null)
  const [iconCode, setIconCode] = useState(null)

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${API_KEY}`)
      .then(response => {
        setTemperature((response.data.main.temp - 273.15).toFixed(2))
        setIconCode(response.data.weather[0].icon)
        setWindVel(response.data.wind.speed)
      })
  },[])

  console.log(iconCode)

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
      <h3>Weather in {country.capital}</h3>
      <p>temperature {temperature} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`} alt={`Icon of the weather in ${country.capital}`}/>
      <p>wind {windVel} m/s</p>
    </div>
  )
}

function App() {
  const [country, setCountry] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllCountries(response.data)
      })
  },[])

  useEffect(() => {
    const newCountries = allCountries.filter(c => c.name.common.toLowerCase().includes(country.toLowerCase()))
    setFilteredCountries(newCountries)
  },[country, allCountries])

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
    setSelectedCountry(null)
  }

  const handleClick = name => {
    const selectedCountry = filteredCountries.find(c => c.name.common === name)
    setSelectedCountry(selectedCountry)
  }

  return (
    <div>
      <p>find countries <input value={country} onChange={handleCountryChange} /></p>
      <div>
        {
          filteredCountries.length > 10 ? 
          <p>Too many matches, specify another filter</p>
          : selectedCountry ?
          <CountryDetail country={selectedCountry} />
          :
          filteredCountries.length === 1 ?
          <CountryDetail country={filteredCountries[0]} />
          :
          filteredCountries.map(c => {
            return <p key={c.name.common}>
                {c.name.common} 
                <button onClick={() => handleClick(c.name.common)}>show</button>
              </p>
          })
        }
      </div>
    </div>
  )
}

export default App
