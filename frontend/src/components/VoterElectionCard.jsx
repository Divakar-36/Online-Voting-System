
import VoterCandidateList from "./VoterCandidateList"

function VoterElectionCard({
    election,
    candidates,
    hasVoted,
    loadingCandidates,
    votingCandidate,
    onViewCandidates,
    onVote
}) {
    const formatDate = (date) => {
        if (!date) {
            return "Not specified"
        }

        const parsedDate = new Date(date)

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {
            return "Invalid date"
        }

        return parsedDate.toLocaleString()
    }

    const isLoadingCandidates =
        loadingCandidates === election.id

    const candidatesLoaded =
        Array.isArray(candidates)

    return (
        <div className="bg-white rounded-xl shadow p-6">

            <div className="flex flex-col md:flex-row md:justify-between gap-5">

                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800">
                        {election.name}
                    </h3>

                    <p className="text-gray-500 mt-2">
                        {election.description ||
                            "No description provided."}
                    </p>

                    <div className="mt-4 text-sm text-gray-600 space-y-1">
                        <p>
                            <strong>
                                Start:
                            </strong>{" "}
                            {formatDate(
                                election.startDate
                            )}
                        </p>

                        <p>
                            <strong>
                                End:
                            </strong>{" "}
                            {formatDate(
                                election.endDate
                            )}
                        </p>
                    </div>
                </div>

                <div>
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                        Active
                    </span>
                </div>
            </div>

            {!hasVoted &&
                !candidatesLoaded && (
                    <button
                        type="button"
                        onClick={() =>
                            onViewCandidates(
                                election.id
                            )
                        }
                        disabled={
                            isLoadingCandidates
                        }
                        className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        {isLoadingCandidates
                            ? "Loading..."
                            : "View Candidates"}
                    </button>
                )}

            {hasVoted && (
                <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg font-semibold">
                    ✓ You have voted in this election.
                </div>
            )}

            {!hasVoted &&
                candidatesLoaded && (
                    <div className="mt-6 border-t pt-6">

                        <h4 className="text-xl font-bold text-gray-800 mb-4">
                            Candidates
                        </h4>

                        <VoterCandidateList
                            candidates={
                                candidates
                            }
                            electionId={
                                election.id
                            }
                            votingCandidate={
                                votingCandidate
                            }
                            onVote={onVote}
                        />

                    </div>
                )}
        </div>
    )
}

export default VoterElectionCard

