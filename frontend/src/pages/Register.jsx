
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import {
    registerUserAsync,
    clearAuthError
} from "../store/slices/authSlice"

function Register() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        loading,
        error: authError
    } = useSelector(
        (state) => state.auth
    )

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

        setError("")
        setSuccess("")

        dispatch(clearAuthError())
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError("")
        setSuccess("")

        dispatch(clearAuthError())

        if (
            Object.values(formData).some(
                (value) => !value.trim()
            )
        ) {
            setError("All fields are required")
            return
        }

        if (formData.password.length < 6) {
            setError(
                "Password must be at least 6 characters"
            )
            return
        }

        if (
            formData.password !==
            formData.confirmPassword
        ) {
            setError("Passwords do not match")
            return
        }

        const result = await dispatch(
            registerUserAsync({
                firstName: formData.firstName,
                lastName: formData.lastName,
                username: formData.username,
                email: formData.email,
                password: formData.password
            })
        )

        if (
            registerUserAsync.fulfilled.match(
                result
            )
        ) {
            setSuccess(
                result.payload?.message ||
                "Registration successful"
            )

            setTimeout(() => {
                navigate("/login")
            }, 1500)
        }
    }

    const displayError =
        error || authError

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Create Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Register as a voter
                    </p>
                </div>

                {displayError && (
                    <div className="mb-5 p-3 rounded-lg bg-red-100 text-red-600 text-sm">
                        {displayError}
                    </div>
                )}

                {success && (
                    <div className="mb-5 p-3 rounded-lg bg-green-100 text-green-600 text-sm">
                        {success}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            name="firstName"
                            type="text"
                            placeholder="First name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            name="lastName"
                            type="text"
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <input
                        name="username"
                        type="text"
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-400"
                    >
                        {loading
                            ? "Registering..."
                            : "Register"}
                    </button>

                </form>

                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default Register

