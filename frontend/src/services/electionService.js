
import api from "./api"

export const getElections = async () => {
    const response = await api.get(
        "/api/admin/elections"
    )

    return response.data
}

export const createElection = async (
    election
) => {
    const response = await api.post(
        "/api/admin/elections",
        election
    )

    return response.data
}

export const deleteElection = async (
    electionId
) => {
    await api.delete(
        `/api/admin/elections/${electionId}`
    )

    return electionId
}

export const toggleElection = async (
    electionId
) => {
    const response = await api.put(
        `/api/admin/elections/${electionId}/toggle`
    )

    return response.data
}

export const getElectionResults = async (
    electionId
) => {
    const response = await api.get(
        `/api/admin/elections/${electionId}/results`
    )

    return response.data
}

