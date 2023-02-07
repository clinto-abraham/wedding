import {
    useEffect, useState,
    useDispatch, useSelector,
    Button, CircularProgress
} from '@/Utils/export'
import { signInWithGooglePopup, signInWithGoogleRedirect } from '@/Utils/firebase';
import { useAuth } from '@/hooks/useAuth';
import { registerUser } from '@/redux/loginSlice';
import { initialLocalState } from '@/Utils/userInitialData';

const SignIn = () => {
    const dispatch = useDispatch();
    const userInfo = useAuth();
    const { user: { isAnonymous } } = useSelector(state => state.user)
    const [loading, setLoading] = useState(false);
    const handleGoogleSignIn = () => {
        setLoading(true);
        signInWithGooglePopup();
        // signInWithGoogleRedirect();
    };

    useEffect(() => {
        if (userInfo?.isAnonymous === (undefined || true)) {
            dispatch(registerUser(initialLocalState?.user))
        } else if (userInfo?.isAnonymous === false) {
            dispatch(registerUser({
                accessToken: userInfo?.accessToken,
                displayName: userInfo?.displayName,
                email: userInfo?.email,
                emailVerified: userInfo?.emailVerified,
                isAnonymous: userInfo?.isAnonymous,
                phoneNumber: userInfo?.phoneNumber,
                photoURL: userInfo?.photoURL,
                providerId: userInfo?.providerId,
                tenantId: userInfo?.tenantId,
                uid: userInfo?.uid
            }))

        }
    }, [userInfo?.isAnonymous])

    useEffect(() => {
        if (!isAnonymous) {
            setLoading(false)
        }
    }, [isAnonymous])

    return (
        <div>
            <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}

                onClick={handleGoogleSignIn}
                disabled={!isAnonymous}
            >
                <img
                    width="40"
                    height="40"
                    src={
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
                    }
                    alt="Google"
                />
                {loading ?
                    (<CircularProgress color="inherit" />)
                    : ('Sign In with Google')}
            </Button>
        </div>
    )
}

export default SignIn

// import { useEffect, useState } from 'react'
// import { Button, CircularProgress } from "@mui/material";
// import { useDispatch, useSelector } from 'react-redux';