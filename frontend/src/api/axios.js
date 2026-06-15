import axios from 'axios'

// Base URL of the backend server (no trailing slash), e.g. http://localhost:5000
const SERVER_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: `${SERVER_URL}/api/v1`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
export const api2 = axios.create({
  baseURL: `${SERVER_URL}/api/`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
