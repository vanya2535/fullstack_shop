import Axios from 'axios'

const user = JSON.parse(localStorage.getItem('user'))

Axios.defaults.baseURL = 'http://localhost:3000/'
Axios.defaults.headers = { Authorization: user._id }

export default Axios
