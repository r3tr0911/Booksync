import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export function AdminRoute({ children }) {
    const { isAdmin } = useAuth();
    // Si NO es admin, lo mando al home
    if (!isAdmin) {
        return <Navigate to="/home" replace />;
    }
    // Si sí es admin, muestro la vista 
    return children;
}