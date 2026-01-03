import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const AuthLayout = () => {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/" replace />
    }
    
    return <Outlet />
}

export default AuthLayout;