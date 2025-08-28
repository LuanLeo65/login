import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoute() {
    const location = useLocation()

    const isAuthenticated = () => localStorage.getItem("token") !== null

    return isAuthenticated() ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location}} replace />
    )
}