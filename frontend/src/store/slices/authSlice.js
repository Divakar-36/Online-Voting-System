
import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit"

import { loginUser } from "../../services/authService"

const defaultAuth = {
    user: null,
    token: null,
    role: null,
    isAuthenticated: false,
    loading: false,
    error: null
}

const getSavedAuth = () => {
    try {
        const savedAuth =
            localStorage.getItem("auth")

        if (!savedAuth) {
            return defaultAuth
        }

        const auth =
            JSON.parse(savedAuth)

        const role = String(
            auth?.role || ""
        ).toUpperCase()

        if (!auth?.token || !role) {
            localStorage.removeItem("auth")
            return defaultAuth
        }

        return {
            user: auth.user || null,
            token: auth.token,
            role,
            isAuthenticated: true,
            loading: false,
            error: null
        }
    } catch {
        localStorage.removeItem("auth")
        return defaultAuth
    }
}

const initialState = getSavedAuth()

export const loginUserAsync =
    createAsyncThunk(
        "auth/login",
        async (
            credentials,
            { rejectWithValue }
        ) => {
            try {
                const data =
                    await loginUser(
                        credentials
                    )

                const role = String(
                    data?.role || ""
                ).toUpperCase()

                if (
                    !data?.token ||
                    !role
                ) {
                    return rejectWithValue(
                        "Login response is missing authentication details."
                    )
                }

                if (
                    role !== "ADMIN" &&
                    role !== "VOTER"
                ) {
                    return rejectWithValue(
                        "Invalid user role received from server."
                    )
                }

                return {
                    user:
                        data.user || null,
                    token: data.token,
                    role
                }
            } catch (error) {
                if (
                    error.response?.status ===
                    401
                ) {
                    return rejectWithValue(
                        "Invalid email or password."
                    )
                }

                if (
                    error.response?.status ===
                    403
                ) {
                    return rejectWithValue(
                        "Access denied."
                    )
                }

                return rejectWithValue(
                    error.response?.data
                        ?.message ||
                    "Login failed. Please try again."
                )
            }
        }
    )

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.role = null
            state.isAuthenticated = false
            state.loading = false
            state.error = null

            localStorage.removeItem("auth")
        },

        clearAuth: (state) => {
            state.user = null
            state.token = null
            state.role = null
            state.isAuthenticated = false
            state.loading = false
            state.error = null

            localStorage.removeItem("auth")
        },

        clearAuthError: (state) => {
            state.error = null
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(
                loginUserAsync.pending,
                (state) => {
                    state.loading = true
                    state.error = null
                }
            )

            .addCase(
                loginUserAsync.fulfilled,
                (
                    state,
                    action
                ) => {
                    const {
                        user,
                        token,
                        role
                    } = action.payload

                    state.user =
                        user || null

                    state.token =
                        token

                    state.role =
                        String(
                            role
                        ).toUpperCase()

                    state.isAuthenticated =
                        true

                    state.loading =
                        false

                    state.error =
                        null

                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            user:
                                state.user,
                            token:
                                state.token,
                            role:
                                state.role,
                            isAuthenticated:
                                true
                        })
                    )
                }
            )

            .addCase(
                loginUserAsync.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading =
                        false

                    state.error =
                        action.payload ||
                        "Login failed. Please try again."
                }
            )
    }
})

export const {
    logout,
    clearAuth,
    clearAuthError
} = authSlice.actions

export default authSlice.reducer

