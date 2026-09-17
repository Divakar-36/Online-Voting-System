
import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit"

import {
    getElections,
    createElection,
    deleteElection,
    toggleElection,
    getElectionResults
} from "../../services/electionService"

export const fetchElections = createAsyncThunk(
    "elections/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const data = await getElections()

            return Array.isArray(data)
                ? data
                : []
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to load elections."
            )
        }
    }
)

export const addElection = createAsyncThunk(
    "elections/add",
    async (election, { rejectWithValue }) => {
        try {
            return await createElection(election)
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to create election."
            )
        }
    }
)

export const removeElection = createAsyncThunk(
    "elections/remove",
    async (electionId, { rejectWithValue }) => {
        try {
            await deleteElection(electionId)

            return electionId
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete election."
            )
        }
    }
)

export const changeElectionStatus =
    createAsyncThunk(
        "elections/toggle",
        async (
            electionId,
            { rejectWithValue }
        ) => {
            try {
                return await toggleElection(
                    electionId
                )
            } catch (error) {
                return rejectWithValue(
                    error.response?.data?.message ||
                    "Failed to update election status."
                )
            }
        }
    )

export const fetchElectionResults =
    createAsyncThunk(
        "elections/results",
        async (
            electionId,
            { rejectWithValue }
        ) => {
            try {
                const data =
                    await getElectionResults(
                        electionId
                    )

                return {
                    electionId,
                    results: Array.isArray(data)
                        ? data
                        : []
                }
            } catch (error) {
                return rejectWithValue(
                    error.response?.data?.message ||
                    "Failed to load election results."
                )
            }
        }
    )

const initialState = {
    items: [],
    status: "idle",
    creating: false,
    deleting: false,
    toggling: false,
    results: {},
    resultsLoading: null,
    error: null,
    message: null
}

const electionSlice = createSlice({
    name: "elections",
    initialState,

    reducers: {
        clearElectionError: (state) => {
            state.error = null
        },

        clearElectionMessage: (state) => {
            state.message = null
        },

        clearElectionFeedback: (state) => {
            state.error = null
            state.message = null
        },

        clearElectionState: () => ({
            ...initialState
        })
    },

    extraReducers: (builder) => {
        builder

            .addCase(
                fetchElections.pending,
                (state) => {
                    state.status = "loading"
                    state.error = null
                }
            )

            .addCase(
                fetchElections.fulfilled,
                (state, action) => {
                    state.status = "succeeded"
                    state.items = action.payload
                    state.error = null
                }
            )

            .addCase(
                fetchElections.rejected,
                (state, action) => {
                    state.status = "failed"
                    state.error =
                        action.payload ||
                        "Failed to load elections."
                }
            )

            .addCase(
                addElection.pending,
                (state) => {
                    state.creating = true
                    state.error = null
                    state.message = null
                }
            )

            .addCase(
                addElection.fulfilled,
                (state, action) => {
                    state.creating = false

                    const newElection =
                        action.payload

                    if (
                        newElection?.id &&
                        !state.items.some(
                            (election) =>
                                election.id ===
                                newElection.id
                        )
                    ) {
                        state.items.push(
                            newElection
                        )
                    }

                    state.message =
                        "Election created successfully."
                }
            )

            .addCase(
                addElection.rejected,
                (state, action) => {
                    state.creating = false
                    state.error =
                        action.payload ||
                        "Failed to create election."
                }
            )

            .addCase(
                removeElection.pending,
                (state) => {
                    state.deleting = true
                    state.error = null
                    state.message = null
                }
            )

            .addCase(
                removeElection.fulfilled,
                (state, action) => {
                    const electionId =
                        action.payload

                    state.deleting = false

                    state.items =
                        state.items.filter(
                            (election) =>
                                election.id !==
                                electionId
                        )

                    delete state.results[
                        electionId
                    ]

                    state.message =
                        "Election deleted successfully."
                }
            )

            .addCase(
                removeElection.rejected,
                (state, action) => {
                    state.deleting = false
                    state.error =
                        action.payload ||
                        "Failed to delete election."
                }
            )

            .addCase(
                changeElectionStatus.pending,
                (state) => {
                    state.toggling = true
                    state.error = null
                    state.message = null
                }
            )

            .addCase(
                changeElectionStatus.fulfilled,
                (state, action) => {
                    state.toggling = false

                    const updatedElection =
                        action.payload

                    if (updatedElection?.id) {
                        const index =
                            state.items.findIndex(
                                (election) =>
                                    election.id ===
                                    updatedElection.id
                            )

                        if (index !== -1) {
                            state.items[index] =
                                updatedElection
                        }
                    }

                    state.message =
                        "Election status updated successfully."
                }
            )

            .addCase(
                changeElectionStatus.rejected,
                (state, action) => {
                    state.toggling = false
                    state.error =
                        action.payload ||
                        "Failed to update election status."
                }
            )

            .addCase(
                fetchElectionResults.pending,
                (state, action) => {
                    state.resultsLoading =
                        action.meta.arg
                    state.error = null
                }
            )

            .addCase(
                fetchElectionResults.fulfilled,
                (state, action) => {
                    const {
                        electionId,
                        results
                    } = action.payload

                    state.results[
                        electionId
                    ] = results

                    state.resultsLoading = null
                }
            )

            .addCase(
                fetchElectionResults.rejected,
                (state, action) => {
                    state.resultsLoading = null
                    state.error =
                        action.payload ||
                        "Failed to load election results."
                }
            )
    }
})

export const {
    clearElectionError,
    clearElectionMessage,
    clearElectionFeedback,
    clearElectionState
} = electionSlice.actions

export default electionSlice.reducer

