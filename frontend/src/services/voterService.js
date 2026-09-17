
import api from "./api"

export const getVotingElections = async () => {
    const response = await api.get(
        "/api/voter/elections"
    )

    return response.data
}

export const getVotingStatus = async (
    electionId
) => {
    const response = await api.get(
        `/api/voter/elections/${electionId}/status`
    )

    return response.data
}

export const getElectionCandidates = async (
    electionId
) => {
    const response = await api.get(
        `/api/voter/elections/${electionId}/candidates`
    )

    return response.data
}

export const submitVote = async (
    electionId,
    candidateId
) => {
    const response = await api.post(
        `/api/voter/elections/${electionId}/candidates/${candidateId}/vote`
    )

    return response.data
}
