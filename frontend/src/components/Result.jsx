
import { useEffect } from "react"
import {
    useDispatch,
    useSelector
} from "react-redux"

import {
    fetchElectionResults,
    clearElectionError
} from "../store/slices/electionSlice"

function Results({
    election,
    onClose
}) {
    const dispatch = useDispatch()

    const {
        results,
        resultsLoading,
        error
    } = useSelector(
        (state) => state.elections
    )

    const electionResults =
        results[election.id] || []

    const loading =
        resultsLoading === election.id

    useEffect(() => {
        dispatch(clearElectionError())

        dispatch(
            fetchElectionResults(
                election.id
            )
        )
    }, [dispatch, election.id])

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

                <div className="flex justify-between items-center p-6 border-b border-gray-200">

                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Election Results
                        </h2>

                        <p className="text-gray-500 mt-1">
                            {election.name}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
                    >
                        ×
                    </button>

                </div>

                <div className="p-6">

                    {loading && (
                        <div className="text-center py-8 text-gray-500">
                            Loading results...
                        </div>
                    )}

                    {!loading && error && (
                        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                            {error}
                        </div>
                    )}

                    {!loading &&
                        !error &&
                        electionResults.length === 0 && (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center text-gray-500">
                                No results available yet.
                            </div>
                        )}

                    {!loading &&
                        !error &&
                        electionResults.length > 0 && (
                            <div className="space-y-4">

                                {electionResults.map(
                                    (result) => (
                                        <div
                                            key={
                                                result.candidateId
                                            }
                                            className="border border-gray-200 rounded-lg p-5 flex justify-between items-center"
                                        >

                                            <div>
                                                <h3 className="text-lg font-bold text-gray-800">
                                                    {
                                                        result.candidateName
                                                    }
                                                </h3>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-blue-600">
                                                    {
                                                        result.voteCount
                                                    }
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    Votes
                                                </p>
                                            </div>

                                        </div>
                                    )
                                )}

                            </div>
                        )}

                </div>

                <div className="px-6 pb-6">

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Results

