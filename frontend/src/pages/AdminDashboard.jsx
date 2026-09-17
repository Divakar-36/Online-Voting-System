
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { logout } from "../store/slices/authSlice"
import ElectionManager from "../components/ElectionManager"

function AdminDashboard() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector(
        (state) => state.auth
    )

    const handleLogout = () => {
        dispatch(logout())

        navigate("/login", {
            replace: true
        })
    }

    return (
        <div className="min-h-screen bg-gray-100">

            <nav className="bg-blue-600 text-white px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">

                    <h1 className="text-xl font-bold">
                        Online Voting System
                    </h1>

                    <div className="flex items-center gap-4">
                        <span className="hidden sm:block text-sm">
                            Welcome,{" "}
                            {user?.firstName ||
                                "Admin"}
                        </span>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-10">

                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Admin Dashboard
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Create elections and manage candidates.
                    </p>
                </div>

                <ElectionManager />

            </main>
        </div>
    )
}

export default AdminDashboard

