import { useState, useEffect } from '@/Utils/export'
import { onAuthStateChanged } from "firebase/auth";
import { auth, signInWithGooglePopup } from "@/Utils/firebase";

export function useAuth() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
        });
        return () => unsubscribe();
        // signInWithGooglePopup()
    }, [])

    return currentUser;
}

// import { useState, useEffect } from "react"