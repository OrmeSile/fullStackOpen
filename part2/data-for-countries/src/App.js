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

const Country = ({ country }) => {
  if (country.length > 1) {
    return country.map((countr) => <p>{ countr.name}</p>)
  } 
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
    </div>
  )
}

const Countries = ({ filter, filteredCountries, handleShowCountry}) => {


  if (filteredCountries.length === 1) {
    return <div>
      <Country country={filteredCountries[0]} />
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

  const handleFilter = (event) => {
    setFilter(event.target.value)
    setFilteredCountries(countries.filter((country) => new RegExp(event.target.value, 'gi').test(country.name)))
  }
  const handleShowCountry = (event) => {
    event.preventDefault()
    console.log(event)
    setFilteredCountries(countries.filter(country => country.name === event.target.textContent))
  }
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
        handleShowCountry ={handleShowCountry}
      />
    </div>
  );
}

export default App;
