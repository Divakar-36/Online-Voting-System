
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { addElection } from "../store/slices/electionSlice"

function ElectionForm({ onSuccess, onCancel }) {
    const dispatch = useDispatch()

    const creating = useSelector(
        (state) => state.elections.creating
    )

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: ""
    })

    const [error, setError] = useState("")

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }))

        setError("")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (creating) {
            return
        }

        setError("")

        const name = formData.name.trim()
        const description =
            formData.description.trim()

        if (!name) {
            setError(
                "Election name is required."
            )
            return
        }

        if (!formData.startDate) {
            setError(
                "Start date and time is required."
            )
            return
        }

        if (!formData.endDate) {
            setError(
                "End date and time is required."
            )
            return
        }

        const startDate =
            new Date(formData.startDate)

        const endDate =
            new Date(formData.endDate)

        if (
            Number.isNaN(
                startDate.getTime()
            )
        ) {
            setError(
                "Invalid start date."
            )
            return
        }

        if (
            Number.isNaN(
                endDate.getTime()
            )
        ) {
            setError(
                "Invalid end date."
            )
            return
        }

        if (startDate >= endDate) {
            setError(
                "End date must be after start date."
            )
            return
        }

        const result = await dispatch(
            addElection({
                name,
                description,
                startDate:
                    formData.startDate,
                endDate:
                    formData.endDate,
                active: false
            })
        )

        if (
            addElection.fulfilled.match(
                result
            )
        ) {
            setFormData({
                name: "",
                description: "",
                startDate: "",
                endDate: ""
            })

            onSuccess()
            return
        }

        setError(
            result.payload ||
            "Failed to create election."
        )
    }

    return (
        <div className="bg-white rounded-xl shadow p-6 md:p-8">

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                        Create Election
                    </h3>

                    <p className="text-gray-500 mt-1">
                        Add a new election to the system.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCancel}
                    disabled={creating}
                    className="text-gray-500 hover:text-red-500 text-xl disabled:opacity-50"
                >
                    ✕
                </button>
            </div>

            {error && (
                <div className="mb-5 p-4 rounded-lg bg-red-100 text-red-700">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <div>
                    <label
                        htmlFor="election-name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Election Name *
                    </label>

                    <input
                        id="election-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="College President Election"
                        disabled={creating}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                </div>

                <div>
                    <label
                        htmlFor="election-description"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Description
                    </label>

                    <textarea
                        id="election-description"
                        name="description"
                        value={
                            formData.description
                        }
                        onChange={handleChange}
                        placeholder="Enter election description"
                        rows="4"
                        disabled={creating}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                </div>

                <div>
                    <label
                        htmlFor="election-start"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Start Date & Time *
                    </label>

                    <input
                        id="election-start"
                        type="datetime-local"
                        name="startDate"
                        value={
                            formData.startDate
                        }
                        onChange={handleChange}
                        disabled={creating}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                </div>

                <div>
                    <label
                        htmlFor="election-end"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        End Date & Time *
                    </label>

                    <input
                        id="election-end"
                        type="datetime-local"
                        name="endDate"
                        value={
                            formData.endDate
                        }
                        onChange={handleChange}
                        disabled={creating}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                </div>

                <div className="flex flex-wrap gap-3 pt-2">

                    <button
                        type="submit"
                        disabled={creating}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        {creating
                            ? "Creating..."
                            : "Create Election"}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={creating}
                        className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold"
                    >
                        Cancel
                    </button>

                </div>
            </form>
        </div>
    )
}

export default ElectionForm

