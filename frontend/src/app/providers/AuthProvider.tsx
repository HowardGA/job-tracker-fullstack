import { createContext, useContext } from "react";
import { useCurrentUser } from "../../queries/auth.queries";
import type { typeCurrentUser } from "../../types/authTypes";

interface AuthContextType {
    user: typeCurrentUser | null | undefined;
    isLoading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children} : {children : React.ReactNode}) => {
    const { data: user, isLoading} = useCurrentUser();

    return (
        <AuthContext.Provider value={{user, isLoading, isAuthenticated: !!user && !isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};