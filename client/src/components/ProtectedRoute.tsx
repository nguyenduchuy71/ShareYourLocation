import { useState, useEffect } from 'react';
import { IAuthenStore } from "@/features/auth/epic/interface";
import { useAuthStore } from "@/features/auth/epic";
import { redirect } from "react-router-dom";
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
                return redirect('/login')
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
