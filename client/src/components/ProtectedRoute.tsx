import { useState, useEffect } from 'react';
import { IAuthenStore } from "@/features/auth/epic/interface";
import { useAuthStore } from "@/features/auth/epic";
import Loading from './Loading';

export default function ProtectedRoute({ component: Component, ...props }) {
    const [checkingValidUser, setCheckingValidUser] = useState(false);
    const [checkUserSessionEpic] = useAuthStore((state: IAuthenStore) => [
        state.checkUserSessionEpic,
    ]);
    useEffect(() => {
        const fetchUserSession = async () => {
            const userData: any = await checkUserSessionEpic();
            if (!userData) {
                window.location.href = '/login'
                return
            }
            setCheckingValidUser(true);
        };

        fetchUserSession();
    }, []);

    if (!checkingValidUser) {
        return <Loading />
    }

    return <Component {...props} />;
}
