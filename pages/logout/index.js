import { useEffect, useState } from 'react'
import { Button, CircularProgress } from "@mui/material";
import { signOutUser } from '@/Utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@/redux/loginSlice';


const Logout = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState("");

    const handleGoogleLogout = () => {
        setLoading(true);
        signOutUser()
        dispatch(registerUser({
            isAnonymous: true
        }))
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
                sx={{ mt: 3, mb: 2 }}
                type="button"
                onClick={handleGoogleLogout}
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