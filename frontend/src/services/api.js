
import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use(
    (config) => {
        const savedAuth = localStorage.getItem("auth")

        if (!savedAuth) {
            return config
        }

        try {
            const auth = JSON.parse(savedAuth)

            if (auth?.token) {
                config.headers.Authorization =
                    `Bearer ${auth.token}`
            }
        } catch {
            localStorage.removeItem("auth")
        }

        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const currentPath = window.location.pathname

            if (currentPath !== "/login") {
                localStorage.removeItem("auth")
            }
        }

        return Promise.reject(error)
    }
)

export default api

