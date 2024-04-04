import React, { useEffect, useState, ReactNode, FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

type ChildrenFunction = (username: string) => ReactNode;

interface AuthWrapperProps {
    children: ReactNode | ChildrenFunction;
}

const AuthWrapper: FunctionComponent<AuthWrapperProps> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser: User | null) => {
            if (!authUser) {
                navigate('/login');
            }
            setUser(authUser);
        });

        return () => unsubscribe();
    }, [navigate]);

    return <>{user && children}</>;
};
export default AuthWrapper;
