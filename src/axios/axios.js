import axios from 'axios'


const instance = axios.create({
	baseURL: 'https://nt-devconnector.onrender.com',
})

export default instance
