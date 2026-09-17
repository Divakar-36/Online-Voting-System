
import { useState } from "react"
import {
    Link,
    useNavigate
} from "react-router-dom"
import {
    useDispatch,
    useSelector
} from "react-redux"

import {
    loginUserAsync,
    clearAuthError
} from "../store/slices/authSlice"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        loading,
        error
    } = useSelector(
        (state) => state.auth
    )

    const [formData, setFormData] =
        useState({
            email: "",
            password: ""
        })

    const handleChange = (event) => {
        const {
            name,
            value
        } = event.target

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }))

        dispatch(clearAuthError())
    }

    const handleSubmit = async (
        event
    ) => {
        event.preventDefault()

        if (loading) {
            return
        }

        const email =
            formData.email.trim()

        if (!email) {
            return
        }

        const result = await dispatch(
            loginUserAsync({
                email,
                password:
                    formData.password
            })
        )

        if (
            loginUserAsync.fulfilled.match(
                result
            )
        ) {
            const role =
                result.payload.role

            if (role === "ADMIN") {
                navigate("/admin", {
                    replace: true
                })
                return
            }

            if (role === "VOTER") {
                navigate("/voter", {
                    replace: true
                })
                return
            }
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Online Voting System
                </h1>

                <p className="text-center text-gray-500 mt-2">
                    Login to continue
                </p>

                {error && (
                    <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-5"
                >

                    <div>
                        <label
                            htmlFor="login-email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email
                        </label>

                        <input
                            id="login-email"
                            type="email"
                            name="email"
                            value={
                                formData.email
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Enter your email"
                            autoComplete="email"
                            required
                            disabled={loading}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="login-password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Password
                        </label>

                        <input
                            id="login-password"
                            type="password"
                            name="password"
                            value={
                                formData.password
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                            disabled={loading}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold"
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>

                <p className="text-center text-gray-500 mt-6">
                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Register as Voter
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default Login

