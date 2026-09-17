
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
    addCandidate,
    clearCandidateError,
    clearCandidateMessage
} from "../store/slices/candidateSlice"

function CandidateForm({ electionId }) {
    const dispatch = useDispatch()

    const {
        saving,
        error
    } = useSelector(
        (state) => state.candidates
    )

    const [formData, setFormData] = useState({
        name: "",
        description: ""
    })

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
                clearCandidateMessage()
            )
            return
        }

        const result = await dispatch(
            addCandidate({
                electionId,
                candidate: {
                    name,
                    description
                }
            })
        )

        if (
            addCandidate.fulfilled.match(
                result
            )
        ) {
            setFormData({
                name: "",
                description: ""
            })
        }
    }

    return (
        <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">

            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Add Candidate
            </h3>

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
                        htmlFor="candidate-name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Candidate Name
                    </label>

                    <input
                        id="candidate-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter candidate name"
                        disabled={saving}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                </div>

                <div>
                    <label
                        htmlFor="candidate-description"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Description
                    </label>

                    <textarea
                        id="candidate-description"
                        name="description"
                        value={
                            formData.description
                        }
                        onChange={handleChange}
                        placeholder="Enter candidate description"
                        rows="3"
                        disabled={saving}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-3 rounded-lg font-semibold"
                >
                    {saving
                        ? "Adding..."
                        : "Add Candidate"}
                </button>

            </form>
        </div>
    )
}

export default CandidateForm

