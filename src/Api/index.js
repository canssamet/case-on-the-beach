import axios from 'axios'

const baseURL = 'http://127.0.0.1:8000/api/'

const instance = axios.create({
	baseURL,
	headers: { 'Content-Type': 'application/json' }
})

instance.interceptors.request.use(
	async config => {
		console.log(config)
		return config
	},
	error => Promise.reject(error)
)

instance.interceptors.response.use(
	async response => {
		// console.log('response', response)
		const { data, status } = response
		if (data && status) {
			// const { status } = data
			// if (status === 401 || status === 403) {
			// }
		}
		console.log(response)
		return response
	},
	async error => {
		console.log(error)
 	  return Promise.reject()
	}
)

export default instance
