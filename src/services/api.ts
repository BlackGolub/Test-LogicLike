import axios from 'axios'

const api = axios.create({
	baseURL: 'https://logiclike.com/docs',
})

export const getCourses = async () => {
	const response = await api.get('/courses.json')
	return response.data
}
