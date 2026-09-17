
import api from "./api"

export const getCandidates = async (
    electionId
) => {
    const response = await api.get(
        `/api/admin/elections/${electionId}/candidates`
    )

    return response.data
}

export const createCandidate = async (
    electionId,
    candidate
) => {
    const response = await api.post(
        `/api/admin/elections/${electionId}/candidates`,
        candidate
    )

    return response.data
}

export const updateCandidate = async (
    candidateId,
    candidate
) => {
    const response = await api.put(
        `/api/admin/candidates/${candidateId}`,
        candidate
    )

    return response.data
}

export const deleteCandidate = async (
    candidateId
) => {
    await api.delete(
        `/api/admin/candidates/${candidateId}`
    )
}

