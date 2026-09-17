
import { useEffect } from "react"
import {
    useDispatch,
    useSelector
} from "react-redux"
import { useNavigate } from "react-router-dom"

import { logout } from "../store/slices/authSlice"

import {
    fetchVoterElections,
    fetchVotingStatuses,
    fetchCandidates,
    voteForCandidate,
    clearVoterState
} from "../store/slices/voterSlice"

import VoterElectionCard from "../components/VoterElectionCard"

function VoterDashboard() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector(
        (state) => state.auth
    )

    const {
        elections,
        candidates,
        votedElections,
        status,
        candidateLoading,
        votingCandidate,
        error,
        message
    } = useSelector(
        (state) => state.voter
    )

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchVoterElections())
        }
    }, [dispatch, status])

    useEffect(() => {
        if (
            status === "succeeded" &&
            elections.length > 0
        ) {
            dispatch(
                fetchVotingStatuses(elections)
            )
        }
    }, [dispatch, status, elections])

    useEffect(() => {
        return () => {
            dispatch(clearVoterState())
        }
    }, [dispatch])

    const handleViewCandidates = (
        electionId
    ) => {
        if (
            candidateLoading === electionId ||
            Array.isArray(
                candidates[electionId]
            )
        ) {
            return
        }

        dispatch(
            fetchCandidates(electionId)
        )
    }

    const handleVote = async (
        electionId,
        candidateId
    ) => {
        if (votingCandidate !== null) {
            return
        }

        const confirmed = window.confirm(
            "Are you sure you want to vote for this candidate?"
        )

        if (!confirmed) {
            return
        }

        await dispatch(
            voteForCandidate({
                electionId,
                candidateId
            })
        )
    }

    const handleLogout = () => {
        dispatch(logout())

        navigate("/login", {
            replace: true
        })
    }

    const isLoading =
        status === "loading"

    return (
        <div className="min-h-screen bg-gray-100">

            <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    Online Voting System
                </h1>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                >
                    Logout
                </button>
            </nav>

            <main className="max-w-6xl mx-auto px-6 py-10">

                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Voter Dashboard
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Welcome,{" "}
                        {user?.firstName || "Voter"}
                    </p>
                </div>

                {message && (
                    <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                        ✓ {message}
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {isLoading && (
                    <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                        Loading elections...
                    </div>
                )}

                {status === "failed" && (
                    <div className="bg-white rounded-xl shadow p-8 text-center">
                        <p className="text-red-600">
                            {error ||
                                "Failed to load elections."}
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                dispatch(
                                    fetchVoterElections()
                                )
                            }
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {status === "succeeded" &&
                    elections.length === 0 && (
                        <div className="bg-white rounded-xl shadow p-8 text-center">
                            <h3 className="text-xl font-semibold text-gray-700">
                                No Active Elections
                            </h3>

                            <p className="text-gray-500 mt-2">
                                There are currently no elections available for voting.
                            </p>
                        </div>
                    )}

                {status === "succeeded" &&
                    elections.length > 0 && (
                        <div className="space-y-6">
                            {elections.map(
                                (election) => (
                                    <VoterElectionCard
                                        key={
                                            election.id
                                        }
                                        election={
                                            election
                                        }
                                        candidates={
                                            candidates[
                                            election.id
                                            ]
                                        }
                                        hasVoted={
                                            votedElections.includes(
                                                election.id
                                            )
                                        }
                                        loadingCandidates={
                                            candidateLoading
                                        }
                                        votingCandidate={
                                            votingCandidate
                                        }
                                        onViewCandidates={
                                            handleViewCandidates
                                        }
                                        onVote={
                                            handleVote
                                        }
                                    />
                                )
                            )}
                        </div>
                    )}
            </main>
        </div>
    )
}

export default VoterDashboard

