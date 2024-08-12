import { Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Component {...restOfProps} />;
}

export default ProtectedRoute;
