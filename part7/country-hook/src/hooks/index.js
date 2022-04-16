import axios from 'axios'
import { useState, useEffect } from 'react'

export const useCountry = (name) => {

  const [country, setCountry] = useState(null)
  const baseUrl = 'https://restcountries.com/v3.1/name/'
  useEffect(() => {
    if (name) {
      return axios
        .get(`${baseUrl}${name}?fullText=true`)
        .then(response => setCountry(response.data[0]))
        .catch(e => setCountry(null))
    }
  }, [name])

  return {
    country
  }
}