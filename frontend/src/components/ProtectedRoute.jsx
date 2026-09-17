
import { Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

function ProtectedRoute({
    children,
    allowedRole
}) {
    const location = useLocation()

    const {
        isAuthenticated,
        role
    } = useSelector((state) => state.auth)

    const normalizedRole = String(
        role || ""
    ).toUpperCase()

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location.pathname
                }}
            />
        )
    }

    if (!normalizedRole) {
        return <Navigate to="/login" replace />
    }

    if (
        allowedRole &&
        normalizedRole !==
        String(allowedRole).toUpperCase()
    ) {
        const redirectPath =
            normalizedRole === "ADMIN"
                ? "/admin"
                : normalizedRole === "VOTER"
                    ? "/voter"
                    : "/login"

        return (
            <Navigate
                to={redirectPath}
                replace
            />
        )
    }

    return children
}

export default ProtectedRoute

