import React, { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

interface AuthWrapperProps {
  children: ReactNode;
}

function AuthWrapper({ children }: AuthWrapperProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser: User | null) => {
      if (!authUser) {
        navigate("/login");
      }
      setUser(authUser);
    });

    return () => unsubscribe();
  }, [navigate]);

  return <>{user && children}</>;
}

export default AuthWrapper;
