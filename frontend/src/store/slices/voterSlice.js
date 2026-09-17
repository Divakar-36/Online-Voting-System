
import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit"

import {
    getVotingElections,
    getVotingStatus,
    getElectionCandidates,
    submitVote
} from "../../services/voterService"

export const fetchVoterElections =
    createAsyncThunk(
        "voter/fetchElections",
        async (_, { rejectWithValue }) => {
            try {
                const data =
                    await getVotingElections()

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

export const fetchVotingStatuses =
    createAsyncThunk(
        "voter/fetchStatuses",
        async (
            elections,
            { rejectWithValue }
        ) => {
            try {
                if (
                    !Array.isArray(elections) ||
                    elections.length === 0
                ) {
                    return []
                }

                const statuses =
                    await Promise.all(
                        elections.map(
                            async (election) => {
                                const data =
                                    await getVotingStatus(
                                        election.id
                                    )

                                return {
                                    id: election.id,
                                    hasVoted:
                                        Boolean(
                                            data?.hasVoted
                                        )
                                }
                            }
                        )
                    )

                return statuses
                    .filter(
                        (status) =>
                            status.hasVoted
                    )
                    .map(
                        (status) =>
                            status.id
                    )
            } catch (error) {
                return rejectWithValue(
                    error.response?.data?.message ||
                    "Failed to load voting status."
                )
            }
        }
    )

export const fetchCandidates =
    createAsyncThunk(
        "voter/fetchCandidates",
        async (
            electionId,
            {
                rejectWithValue,
                getState
            }
        ) => {
            try {
                const state =
                    getState()

                const cachedCandidates =
                    state.voter?.candidates?.[
                    electionId
                    ]

                if (
                    Array.isArray(
                        cachedCandidates
                    )
                ) {
                    return {
                        electionId,
                        candidates:
                            cachedCandidates
                    }
                }

                const data =
                    await getElectionCandidates(
                        electionId
                    )

                return {
                    electionId,
                    candidates:
                        Array.isArray(data)
                            ? data
                            : []
                }
            } catch (error) {
                return rejectWithValue(
                    error.response?.data?.message ||
                    "Failed to load candidates."
                )
            }
        }
    )

export const voteForCandidate =
    createAsyncThunk(
        "voter/vote",
        async (
            {
                electionId,
                candidateId
            },
            { rejectWithValue }
        ) => {
            try {
                const data =
                    await submitVote(
                        electionId,
                        candidateId
                    )

                return {
                    electionId,
                    candidateId,
                    message:
                        data?.message ||
                        "Vote submitted successfully."
                }
            } catch (error) {
                return rejectWithValue(
                    error.response?.data?.message ||
                    "Failed to submit vote."
                )
            }
        }
    )

const initialState = {
    elections: [],
    candidates: {},
    votedElections: [],
    status: "idle",
    statusesLoading: false,
    candidateLoading: null,
    votingCandidate: null,
    error: null,
    message: null
}

const voterSlice = createSlice({
    name: "voter",
    initialState,

    reducers: {
        clearVoterError: (state) => {
            state.error = null
        },

        clearVoterMessage: (state) => {
            state.message = null
        },

        clearVoterFeedback: (state) => {
            state.error = null
            state.message = null
        },

        clearVoterState: () => ({
            ...initialState
        })
    },

    extraReducers: (builder) => {
        builder

            .addCase(
                fetchVoterElections.pending,
                (state) => {
                    state.status = "loading"
                    state.error = null
                    state.message = null
                }
            )

            .addCase(
                fetchVoterElections.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.status =
                        "succeeded"

                    state.elections =
                        action.payload

                    state.error = null
                }
            )

            .addCase(
                fetchVoterElections.rejected,
                (
                    state,
                    action
                ) => {
                    state.status = "failed"

                    state.error =
                        action.payload ||
                        "Failed to load elections."
                }
            )

            .addCase(
                fetchVotingStatuses.pending,
                (state) => {
                    state.statusesLoading =
                        true

                    state.error = null
                }
            )

            .addCase(
                fetchVotingStatuses.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.statusesLoading =
                        false

                    state.votedElections =
                        action.payload
                }
            )

            .addCase(
                fetchVotingStatuses.rejected,
                (
                    state,
                    action
                ) => {
                    state.statusesLoading =
                        false

                    state.error =
                        action.payload ||
                        "Failed to load voting status."
                }
            )

            .addCase(
                fetchCandidates.pending,
                (
                    state,
                    action
                ) => {
                    state.candidateLoading =
                        action.meta.arg

                    state.error = null
                }
            )

            .addCase(
                fetchCandidates.fulfilled,
                (
                    state,
                    action
                ) => {
                    const {
                        electionId,
                        candidates
                    } = action.payload

                    state.candidates[
                        electionId
                    ] = candidates

                    state.candidateLoading =
                        null
                }
            )

            .addCase(
                fetchCandidates.rejected,
                (
                    state,
                    action
                ) => {
                    state.candidateLoading =
                        null

                    state.error =
                        action.payload ||
                        "Failed to load candidates."
                }
            )

            .addCase(
                voteForCandidate.pending,
                (
                    state,
                    action
                ) => {
                    state.votingCandidate =
                        action.meta.arg.candidateId

                    state.error = null
                    state.message = null
                }
            )

            .addCase(
                voteForCandidate.fulfilled,
                (
                    state,
                    action
                ) => {
                    const {
                        electionId,
                        message
                    } = action.payload

                    state.votingCandidate =
                        null

                    state.message =
                        message

                    if (
                        !state.votedElections.includes(
                            electionId
                        )
                    ) {
                        state.votedElections.push(
                            electionId
                        )
                    }

                    delete state.candidates[
                        electionId
                    ]
                }
            )

            .addCase(
                voteForCandidate.rejected,
                (
                    state,
                    action
                ) => {
                    state.votingCandidate =
                        null

                    state.error =
                        action.payload ||
                        "Failed to submit vote."
                }
            )
    }
})

export const {
    clearVoterError,
    clearVoterMessage,
    clearVoterFeedback,
    clearVoterState
} = voterSlice.actions

export default voterSlice.reducer

