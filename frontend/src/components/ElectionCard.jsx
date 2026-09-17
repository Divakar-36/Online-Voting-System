
function ElectionCard({
    election,
    onManageCandidates,
    onViewResults,
    onToggle,
    onDelete,
    deleting = false,
    toggling = false
}) {
    const formatDate = (date) => {
        if (!date) {
            return "Not specified"
        }

        const parsedDate = new Date(date)

        if (Number.isNaN(parsedDate.getTime())) {
            return "Invalid date"
        }

        return parsedDate.toLocaleString()
    }

    const actionDisabled =
        deleting || toggling

    return (
        <div className="bg-white rounded-xl shadow p-6">

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                <div className="flex-1">

                    <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-bold text-gray-800">
                            {election.name}
                        </h3>

                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${election.active
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                        >
                            {election.active
                                ? "Active"
                                : "Inactive"}
                        </span>
                    </div>

                    <p className="text-gray-600 mt-2">
                        {election.description ||
                            "No description provided."}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">

                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500">
                                Start Date
                            </p>

                            <p className="text-sm font-medium text-gray-700 mt-1">
                                {formatDate(
                                    election.startDate
                                )}
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500">
                                End Date
                            </p>

                            <p className="text-sm font-medium text-gray-700 mt-1">
                                {formatDate(
                                    election.endDate
                                )}
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-gray-200">

                <button
                    type="button"
                    onClick={() =>
                        onManageCandidates(
                            election
                        )
                    }
                    disabled={actionDisabled}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg font-medium"
                >
                    Manage Candidates
                </button>

                <button
                    type="button"
                    onClick={() =>
                        onViewResults(
                            election
                        )
                    }
                    disabled={actionDisabled}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white px-4 py-2 rounded-lg font-medium"
                >
                    View Results
                </button>

                {onToggle && (
                    <button
                        type="button"
                        onClick={() =>
                            onToggle(election)
                        }
                        disabled={actionDisabled}
                        className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white px-4 py-2 rounded-lg font-medium"
                    >
                        {toggling
                            ? "Updating..."
                            : election.active
                                ? "Deactivate"
                                : "Activate"}
                    </button>
                )}

                <button
                    type="button"
                    onClick={() =>
                        onDelete(
                            election.id
                        )
                    }
                    disabled={actionDisabled}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-4 py-2 rounded-lg font-medium"
                >
                    {deleting
                        ? "Deleting..."
                        : "Delete"}
                </button>

            </div>
        </div>
    )
}

export default ElectionCard

