
function CandidateList({
    candidates,
    loading,
    saving,
    processingCandidateId,
    onEdit,
    onDelete
}) {
    if (loading) {
        return (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center text-gray-500">
                Loading candidates...
            </div>
        )
    }

    if (
        !Array.isArray(candidates) ||
        candidates.length === 0
    ) {
        return (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                <p className="text-gray-600 font-medium">
                    No candidates found.
                </p>

                <p className="text-gray-400 text-sm mt-1">
                    Add a candidate using the form above.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {candidates.map((candidate) => {
                const isProcessing =
                    saving &&
                    processingCandidateId ===
                    candidate.id

                return (
                    <div
                        key={candidate.id}
                        className="border border-gray-200 rounded-lg p-5"
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-gray-800">
                                    {candidate.name}
                                </h4>

                                <p className="text-gray-500 mt-1">
                                    {candidate.description ||
                                        "No description provided."}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">

                                <button
                                    type="button"
                                    onClick={() =>
                                        onEdit(
                                            candidate
                                        )
                                    }
                                    disabled={saving}
                                    className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white px-4 py-2 rounded-lg font-medium"
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        onDelete(
                                            candidate.id
                                        )
                                    }
                                    disabled={saving}
                                    className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-4 py-2 rounded-lg font-medium"
                                >
                                    {isProcessing
                                        ? "Deleting..."
                                        : "Delete"}
                                </button>

                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CandidateList

