import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { auth } from '../config/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';


function AuthWrapper() {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            setLoggedIn(!user);
        });

        return () => unsubscribe();
    }, []);
    return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthWrapper