
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
    fetchElections,
    removeElection,
    changeElectionStatus,
    clearElectionFeedback
} from "../store/slices/electionSlice"

import ElectionForm from "./ElectionForm"
import ElectionCard from "./ElectionCard"
import CandidateManager from "./CandidateManager"
import Results from "./Result"

function ElectionManager() {
    const dispatch = useDispatch()

    const {
        items: elections,
        status,
        creating,
        deleting,
        toggling,
        error,
        message
    } = useSelector(
        (state) => state.elections
    )

    const [showForm, setShowForm] =
        useState(false)

    const [
        selectedElection,
        setSelectedElection
    ] = useState(null)

    const [
        resultsElection,
        setResultsElection
    ] = useState(null)

    const [
        deletingElectionId,
        setDeletingElectionId
    ] = useState(null)

    const [
        togglingElectionId,
        setTogglingElectionId
    ] = useState(null)

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchElections())
        }
    }, [dispatch, status])

    useEffect(() => {
        return () => {
            dispatch(clearElectionFeedback())
        }
    }, [dispatch])

    const handleCreateSuccess = () => {
        setShowForm(false)
    }

    const handleDelete = async (
        electionId
    ) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this election?"
        )

        if (!confirmed) {
            return
        }

        setDeletingElectionId(electionId)

        await dispatch(
            removeElection(electionId)
        )

        setDeletingElectionId(null)
    }

    const handleToggle = async (
        election
    ) => {
        const action = election.active
            ? "deactivate"
            : "activate"

        const confirmed = window.confirm(
            `Are you sure you want to ${action} this election?`
        )

        if (!confirmed) {
            return
        }

        setTogglingElectionId(
            election.id
        )

        await dispatch(
            changeElectionStatus(
                election.id
            )
        )

        setTogglingElectionId(null)
    }

    const handleManageCandidates = (
        election
    ) => {
        setSelectedElection(election)
    }

    const handleViewResults = (
        election
    ) => {
        setResultsElection(election)
    }

    const handleCloseCandidates = () => {
        setSelectedElection(null)
    }

    const handleCloseResults = () => {
        setResultsElection(null)
    }

    const handleCloseForm = () => {
        setShowForm(false)
    }

    if (selectedElection) {
        return (
            <CandidateManager
                election={selectedElection}
                onClose={
                    handleCloseCandidates
                }
            />
        )
    }

    return (
        <div className="space-y-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Elections
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Create and manage elections.
                    </p>
                </div>

                {!showForm && (
                    <button
                        type="button"
                        onClick={() =>
                            setShowForm(true)
                        }
                        disabled={
                            creating ||
                            deleting ||
                            toggling
                        }
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-3 rounded-lg font-semibold"
                    >
                        Create Election
                    </button>
                )}
            </div>

            {message && (
                <div className="bg-green-100 text-green-700 p-4 rounded-lg">
                    {message}
                </div>
            )}

            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                    {error}
                </div>
            )}

            {showForm && (
                <ElectionForm
                    onSuccess={
                        handleCreateSuccess
                    }
                    onCancel={
                        handleCloseForm
                    }
                />
            )}

            {status === "loading" && (
                <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                    Loading elections...
                </div>
            )}

            {status === "failed" &&
                elections.length === 0 && (
                    <div className="bg-white rounded-xl shadow p-8 text-center">

                        <p className="text-red-600 mb-4">
                            {error ||
                                "Failed to load elections."}
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                dispatch(
                                    fetchElections()
                                )
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
                        >
                            Try Again
                        </button>

                    </div>
                )}

            {status === "succeeded" &&
                elections.length === 0 && (
                    <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                        No elections found.
                    </div>
                )}

            {elections.length > 0 && (
                <div className="grid grid-cols-1 gap-6">

                    {elections.map(
                        (election) => (
                            <ElectionCard
                                key={
                                    election.id
                                }
                                election={
                                    election
                                }
                                onManageCandidates={
                                    handleManageCandidates
                                }
                                onViewResults={
                                    handleViewResults
                                }
                                onToggle={
                                    handleToggle
                                }
                                onDelete={
                                    handleDelete
                                }
                                deleting={
                                    deleting &&
                                    deletingElectionId ===
                                    election.id
                                }
                                toggling={
                                    toggling &&
                                    togglingElectionId ===
                                    election.id
                                }
                            />
                        )
                    )}

                </div>
            )}

            {resultsElection && (
                <Results
                    election={
                        resultsElection
                    }
                    onClose={
                        handleCloseResults
                    }
                />
            )}
        </div>
    )
}

export default ElectionManager

