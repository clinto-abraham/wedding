import { useEffect, useState } from 'react'
import { Button, CircularProgress } from "@mui/material";
import { signOutUser } from '@/Utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@/redux/loginSlice';
import { initialLocalState } from '@/Utils/userInitialData';
import { useRouter } from 'next/router';

const Logout = () => {
    const dispatch = useDispatch()
    const router = useRouter();
    const { user } = useSelector(state => state.user)
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState("");

    const handleGoogleLogout = () => {
        setLoading(true);
        signOutUser()
        dispatch(registerUser(initialLocalState.user))
        router.push('profile')
    };

    useEffect(() => {
        if (user) {
            setLoading(false)
        }
    }, [user])
    return (
        <div>
            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, margin: '0rem 10rem' }}
                type="button"
                onClick={handleGoogleLogout}
                disabled={user?.isAnonymous}
            >

                {loading ? (
                    <CircularProgress color="inherit" />
                ) : ("Logout"
                )
                }
            </Button>
        </div>
    )
}

export default Logout