
function VoterCandidateList({
    candidates,
    electionId,
    votingCandidate,
    onVote
}) {
    if (
        !Array.isArray(candidates) ||
        candidates.length === 0
    ) {
        return (
            <div className="bg-gray-50 border border-gray-200 p-5 rounded-lg text-gray-500 text-center">
                No candidates available.
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {candidates.map(
                (candidate) => {
                    const isVoting =
                        votingCandidate ===
                        candidate.id

                    const isAnotherCandidateVoting =
                        votingCandidate !== null &&
                        votingCandidate !==
                        candidate.id

                    return (
                        <div
                            key={
                                candidate.id
                            }
                            className="border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4"
                        >

                            <div className="flex-1">
                                <h5 className="font-bold text-lg text-gray-800">
                                    {
                                        candidate.name
                                    }
                                </h5>

                                <p className="text-gray-500 mt-1">
                                    {
                                        candidate.description ||
                                        "No description provided."
                                    }
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    onVote(
                                        electionId,
                                        candidate.id
                                    )
                                }
                                disabled={
                                    isVoting ||
                                    isAnotherCandidateVoting
                                }
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg font-semibold min-w-24"
                            >
                                {isVoting
                                    ? "Voting..."
                                    : "Vote"}
                            </button>

                        </div>
                    )
                }
            )}
        </div>
    )
}

export default VoterCandidateList

