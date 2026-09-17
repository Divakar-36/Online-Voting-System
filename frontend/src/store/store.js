
import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./slices/authSlice"
import electionReducer from "./slices/electionSlice"
import candidateReducer from "./slices/candidateSlice"
import voterReducer from "./slices/voterSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        elections: electionReducer,
        candidates: candidateReducer,
        voter: voterReducer
    }
})

export default store

