import { useAuth } from "@/features/auth/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Component {...rest} />;
}

export default ProtectedRoute;
