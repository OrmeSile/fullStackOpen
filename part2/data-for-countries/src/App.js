import axios from 'axios';
import {useState, useEffect} from 'react';

const Filter = ({ filter, onChange }) => {
  return (
    <div>
      find countries <input value={filter} onChange={onChange} />
   </div>
 )
}

const Languages = ({ languages }) => Object.values(languages).map((language) => <p>{language}</p>)

const Country = ({ country, setWeatherInfo, weatherInfo }) => {
  
  return (
    <div>
      <h3>{country.name}</h3>
      <div>
        <h4>capitals</h4>
        {country.capital.map(capital => <p>{capital}</p>)}
      </div>
      <p>area {country.area}</p>
      <h5>languages:</h5>
      <ul>
        <Languages languages = {country.languages} />
      </ul>
      <img src={country.flag} alt='flag' />
      <div>
        <h4>Weather in {country.capital[0]}</h4>
        <p>temperature {weatherInfo.temperature}</p>
        <img src={`http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`} alt='weather icon' />
        <p>wind { weatherInfo.windSpeed} m/s</p>
      </div>
    </div>
  )
}

const Countries = ({ filter, filteredCountries, handleShowCountry, setWeatherInfo, weatherInfo}) => {

  if (filteredCountries.length === 1) {
    return <div>
      <Country
        country={filteredCountries[0]}
        setWeatherInfo={setWeatherInfo}
        weatherInfo={weatherInfo}
        />
    </div>
  } else if (filteredCountries.length <= 10) {
    return (
      filteredCountries.map((country) => {
        return (
          <form onSubmit={handleShowCountry}>
            <input type='hidden' name='country' value={country.name} />
            {country.name}
            <input type='submit' value='show' />
          </form>
        )
      })
    )
  } else if (filter) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  return <div></div>
}

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [weatherInfo, setWeatherInfo] = useState([])

  const handleFilter = (event) => {
    setFilter(event.target.value)
    setFilteredCountries(countries.filter((country) => new RegExp(event.target.value, 'gi').test(country.name)))
  }
  const handleShowCountry = (event) => {
    event.preventDefault()
    setFilteredCountries(countries.filter(country => country.name === event.target.textContent))
  }

  const weatherApiKey = process.env.REACT_APP_API_KEY
  useEffect(() => {
    console.log(filteredCountries.length)
    if (filteredCountries.length === 1) {
      axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${filteredCountries[0].capital[0]}&limit=1&appid=${weatherApiKey}`)
        .then(response => {
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&units=metric&appid=${weatherApiKey}`
          console.log(url)
          axios.get(url)
            .then(r => {
              console.log(r)
              const newWeatherInfo = {
                temperature: r.data.main.temp,
                icon: r.data.weather[0].icon,
                windSpeed: r.data.wind.speed
              }
              setWeatherInfo(newWeatherInfo)
            })
        })
      console.log(weatherInfo);
    }
    },[filteredCountries])
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data.map((country) => {
          return {
            name: country.name.common,
            capital: country.capital,
            area: country.area,
            languages: country.languages,
            flag: country.flags.png
          }
        }))
      })
  }, [])

  return (
    <div>
      <Filter value={filter} onChange={handleFilter} />
      <Countries
        countries={countries}
        filter={filter}
        filteredCountries={filteredCountries}
        handleShowCountry={handleShowCountry}
        weatherInfo={weatherInfo}
        setWeatherInfo={setWeatherInfo}
      />
    </div>
  );
}

export default App;
