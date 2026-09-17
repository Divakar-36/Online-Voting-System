
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
    fetchCandidates,
    removeCandidate,
    clearCandidateMessage,
    clearCandidateError,
    clearCandidateState
} from "../store/slices/candidateSlice"

import CandidateForm from "./CandidateForm"
import CandidateList from "./CandidateList"
import CandidateEditForm from "./CandidateEditForm"

function CandidateManager({
    election,
    onClose
}) {
    const dispatch = useDispatch()

    const {
        candidates,
        loading,
        saving,
        error,
        message
    } = useSelector(
        (state) => state.candidates
    )

    const [
        editingCandidate,
        setEditingCandidate
    ] = useState(null)

    const [
        processingCandidateId,
        setProcessingCandidateId
    ] = useState(null)

    useEffect(() => {
        dispatch(clearCandidateState())

        dispatch(
            fetchCandidates(election.id)
        )

        return () => {
            dispatch(clearCandidateState())
        }
    }, [dispatch, election.id])

    const handleEdit = (candidate) => {
        setEditingCandidate(candidate)

        dispatch(clearCandidateError())
        dispatch(clearCandidateMessage())
    }

    const handleCancelEdit = () => {
        setEditingCandidate(null)

        dispatch(clearCandidateError())
        dispatch(clearCandidateMessage())
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this candidate?"
        )

        if (!confirmed) {
            return
        }

        setProcessingCandidateId(id)

        const result = await dispatch(
            removeCandidate(id)
        )

        setProcessingCandidateId(null)

        if (
            result.meta.requestStatus ===
            "fulfilled"
        ) {
            setEditingCandidate(null)
        }
    }

    const handleClose = () => {
        dispatch(clearCandidateState())
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">

                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Manage Candidates
                        </h2>

                        <p className="text-gray-500 mt-1">
                            {election.name}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={saving}
                        className="text-gray-500 hover:text-red-500 disabled:opacity-50 text-xl"
                    >
                        ✕
                    </button>
                </div>

                {message && (
                    <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {editingCandidate ? (
                    <CandidateEditForm
                        candidate={
                            editingCandidate
                        }
                        onCancel={
                            handleCancelEdit
                        }
                    />
                ) : (
                    <CandidateForm
                        electionId={
                            election.id
                        }
                    />
                )}

                <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Candidates
                        </h3>

                        <span className="text-sm text-gray-500">
                            {candidates.length}{" "}
                            {candidates.length === 1
                                ? "candidate"
                                : "candidates"}
                        </span>
                    </div>

                    <CandidateList
                        candidates={candidates}
                        loading={loading}
                        saving={saving}
                        processingCandidateId={
                            processingCandidateId
                        }
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>

            </div>
        </div>
    )
}

export default CandidateManager

