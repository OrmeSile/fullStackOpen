import axios from 'axios'
import { useEffect, useState } from 'react'

export const useResource = (baseUrl) => {

  const [items, setItems] = useState([])

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }

  useEffect( async () => {
    const fetched = await getAll()
    setItems(fetched)
  }, [])
  
  const create = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    return response.data
  }
  const update = async (id, newObject) => {
    const response = await axios.put(`${ baseUrl } /${id}`, newObject)
    return response.data
  }

  const service = {
    create,
    update
  }

  return [
    items, service
  ]
}


