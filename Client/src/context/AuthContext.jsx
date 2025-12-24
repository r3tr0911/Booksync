import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({
        id: 1,
        name: "Kevin Steven",
        role: "admin",
    });

    const value = useMemo(() => {
        const isAdmin = currentUser?.role === "admin";

        return {
            currentUser,
            isAdmin,
            setCurrentUser,
        };
    }, [currentUser]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth (){
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth debe usarse dentro de <AuthProvider>");
    }
    return ctx; 
}