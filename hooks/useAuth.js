import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Utils/firebase";

export function useAuth() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
        });
        return () => unsubscribe();
    }, [])

    return currentUser;
}