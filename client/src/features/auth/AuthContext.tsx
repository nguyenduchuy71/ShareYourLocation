import { createContext, useState, useEffect, useContext } from 'react';
import { IAuthenStore } from "@/features/login/epic/interface";
import { useAuthStore } from "@/features/login/epic";

interface AuthContextType {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
    const [checkUserSessionEpic] = useAuthStore((state: IAuthenStore) => [
        state.checkUserSessionEpic,
    ]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserSession = async () => {
            const userData = await checkUserSessionEpic();
            setUser(userData);
        };

        fetchUserSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};