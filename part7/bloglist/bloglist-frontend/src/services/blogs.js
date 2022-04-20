import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const config = (token) => {
  return { headers: { Authorization: token } }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config(token))
  return response.data
}

const update = async (newObject) => {
  console.log(newObject)
  const request = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config(token))
  return request.data
}
const deleteBlog = async (newObject) => {
  const request = await axios.delete(`${baseUrl}/${newObject.id}`, config(token))
  return request.data
}

export default { getAll, create, update, setToken, deleteBlog }