
import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit"

import {
    getCandidates,
    createCandidate,
    updateCandidate,
    deleteCandidate
} from "../../services/candidateService"

export const fetchCandidates =
    createAsyncThunk(
        "candidates/fetch",
        async (
            electionId,
            { rejectWithValue }
        ) => {
            try {
                const data =
                    await getCandidates(
                        electionId
                    )

                return Array.isArray(data)
                    ? data
                    : []
            } catch (error) {
                return rejectWithValue(
                    error.response?.data
                        ?.message ||
                    "Failed to load candidates."
                )
            }
        }
    )

export const addCandidate =
    createAsyncThunk(
        "candidates/add",
        async (
            { electionId, candidate },
            { rejectWithValue }
        ) => {
            try {
                return await createCandidate(
                    electionId,
                    candidate
                )
            } catch (error) {
                return rejectWithValue(
                    error.response?.data
                        ?.message ||
                    "Failed to add candidate."
                )
            }
        }
    )

export const editCandidate =
    createAsyncThunk(
        "candidates/edit",
        async (
            { id, candidate },
            { rejectWithValue }
        ) => {
            try {
                return await updateCandidate(
                    id,
                    candidate
                )
            } catch (error) {
                return rejectWithValue(
                    error.response?.data
                        ?.message ||
                    "Failed to update candidate."
                )
            }
        }
    )

export const removeCandidate =
    createAsyncThunk(
        "candidates/remove",
        async (
            id,
            { rejectWithValue }
        ) => {
            try {
                await deleteCandidate(id)

                return id
            } catch (error) {
                return rejectWithValue(
                    error.response?.data
                        ?.message ||
                    "Failed to delete candidate."
                )
            }
        }
    )

const initialState = {
    candidates: [],
    loading: false,
    saving: false,
    error: "",
    message: ""
}

const candidateSlice = createSlice({
    name: "candidates",
    initialState,

    reducers: {
        clearCandidateError: (
            state
        ) => {
            state.error = ""
        },

        clearCandidateMessage: (
            state
        ) => {
            state.message = ""
        },

        clearCandidateFeedback: (
            state
        ) => {
            state.error = ""
            state.message = ""
        },

        setCandidateError: (
            state,
            action
        ) => {
            state.error =
                action.payload || ""
        },

        clearCandidateState: () =>
            initialState
    },

    extraReducers: (builder) => {
        builder

            .addCase(
                fetchCandidates.pending,
                (state) => {
                    state.loading = true
                    state.error = ""
                    state.message = ""
                    state.candidates = []
                }
            )

            .addCase(
                fetchCandidates.fulfilled,
                (state, action) => {
                    state.loading = false
                    state.candidates =
                        action.payload
                }
            )

            .addCase(
                fetchCandidates.rejected,
                (state, action) => {
                    state.loading = false
                    state.candidates = []
                    state.error =
                        action.payload ||
                        "Failed to load candidates."
                }
            )

            .addCase(
                addCandidate.pending,
                (state) => {
                    state.saving = true
                    state.error = ""
                    state.message = ""
                }
            )

            .addCase(
                addCandidate.fulfilled,
                (state, action) => {
                    state.saving = false

                    if (action.payload) {
                        state.candidates.push(
                            action.payload
                        )
                    }

                    state.message =
                        "Candidate added successfully."
                }
            )

            .addCase(
                addCandidate.rejected,
                (state, action) => {
                    state.saving = false
                    state.error =
                        action.payload ||
                        "Failed to add candidate."
                }
            )

            .addCase(
                editCandidate.pending,
                (state) => {
                    state.saving = true
                    state.error = ""
                    state.message = ""
                }
            )

            .addCase(
                editCandidate.fulfilled,
                (state, action) => {
                    state.saving = false

                    const updatedCandidate =
                        action.payload

                    if (
                        updatedCandidate?.id
                    ) {
                        const index =
                            state.candidates.findIndex(
                                (candidate) =>
                                    candidate.id ===
                                    updatedCandidate.id
                            )

                        if (index !== -1) {
                            state.candidates[
                                index
                            ] =
                                updatedCandidate
                        }
                    }

                    state.message =
                        "Candidate updated successfully."
                }
            )

            .addCase(
                editCandidate.rejected,
                (state, action) => {
                    state.saving = false
                    state.error =
                        action.payload ||
                        "Failed to update candidate."
                }
            )

            .addCase(
                removeCandidate.pending,
                (state) => {
                    state.saving = true
                    state.error = ""
                    state.message = ""
                }
            )

            .addCase(
                removeCandidate.fulfilled,
                (state, action) => {
                    state.saving = false

                    state.candidates =
                        state.candidates.filter(
                            (candidate) =>
                                candidate.id !==
                                action.payload
                        )

                    state.message =
                        "Candidate deleted successfully."
                }
            )

            .addCase(
                removeCandidate.rejected,
                (state, action) => {
                    state.saving = false
                    state.error =
                        action.payload ||
                        "Failed to delete candidate."
                }
            )
    }
})

export const {
    clearCandidateError,
    clearCandidateMessage,
    clearCandidateFeedback,
    setCandidateError,
    clearCandidateState
} = candidateSlice.actions

export default candidateSlice.reducer

