import Axios from 'axios'

Axios.defaults.baseURL = 'http://localhost:3000/'

Axios.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('user'))?._id
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

export default Axios
