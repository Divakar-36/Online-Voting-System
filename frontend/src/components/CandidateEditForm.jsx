
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
    editCandidate,
    clearCandidateError,
    clearCandidateMessage,
    setCandidateError
} from "../store/slices/candidateSlice"

function CandidateEditForm({
    candidate,
    onCancel
}) {
    const dispatch = useDispatch()

    const {
        saving,
        error
    } = useSelector(
        (state) => state.candidates
    )

    const [formData, setFormData] = useState({
        name: candidate?.name || "",
        description:
            candidate?.description || ""
    })

    useEffect(() => {
        setFormData({
            name: candidate?.name || "",
            description:
                candidate?.description || ""
        })

        dispatch(clearCandidateError())
        dispatch(clearCandidateMessage())
    }, [candidate, dispatch])

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }))

        dispatch(clearCandidateError())
        dispatch(clearCandidateMessage())
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (saving) {
            return
        }

        const name = formData.name.trim()
        const description =
            formData.description.trim()

        if (!name) {
            dispatch(
                setCandidateError(
                    "Candidate name is required."
                )
            )
            return
        }

        if (!candidate?.id) {
            dispatch(
                setCandidateError(
                    "Candidate information is missing."
                )
            )
            return
        }

        const result = await dispatch(
            editCandidate({
                id: candidate.id,
                candidate: {
                    name,
                    description
                }
            })
        )

        if (
            editCandidate.fulfilled.match(
                result
            )
        ) {
            onCancel()
        }
    }

    return (
        <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-5">

            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    Edit Candidate
                </h3>

                <button
                    type="button"
                    onClick={onCancel}
                    disabled={saving}
                    className="text-gray-500 hover:text-red-500 disabled:opacity-50 text-xl"
                >
                    ✕
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <div>
                    <label
                        htmlFor="edit-candidate-name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Candidate Name
                    </label>

                    <input
                        id="edit-candidate-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={saving}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:bg-gray-100"
                    />
                </div>

                <div>
                    <label
                        htmlFor="edit-candidate-description"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Description
                    </label>

                    <textarea
                        id="edit-candidate-description"
                        name="description"
                        value={
                            formData.description
                        }
                        onChange={handleChange}
                        rows="3"
                        disabled={saving}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:bg-gray-100"
                    />
                </div>

                <div className="flex flex-wrap gap-3">

                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white px-5 py-3 rounded-lg font-semibold"
                    >
                        {saving
                            ? "Updating..."
                            : "Update Candidate"}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={saving}
                        className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 px-5 py-3 rounded-lg font-semibold"
                    >
                        Cancel
                    </button>

                </div>
            </form>
        </div>
    )
}

export default CandidateEditForm

