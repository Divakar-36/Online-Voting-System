
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import { useSelector } from "react-redux"

import Login from "./pages/Login"
import Register from "./pages/Register"
import VoterDashboard from "./pages/VoterDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  const {
    isAuthenticated,
    role
  } = useSelector((state) => state.auth)

  const normalizedRole = String(
    role || ""
  ).toUpperCase()

  const getHomeRoute = () => {
    if (!isAuthenticated) {
      return "/login"
    }

    if (normalizedRole === "ADMIN") {
      return "/admin"
    }

    if (normalizedRole === "VOTER") {
      return "/voter"
    }

    return "/login"
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={getHomeRoute()}
              replace
            />
          }
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate
                to={getHomeRoute()}
                replace
              />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/voter"
          element={
            <ProtectedRoute allowedRole="VOTER">
              <VoterDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to={getHomeRoute()}
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App

