import { useState } from 'react'
import { Button, CircularProgress } from "@mui/material";
import { signInWithGooglePopup } from '@/Utils/firebase';

const Login = () => {
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const handleGoogleSignIn = () => {
        setLoading(true);
        signInWithGooglePopup();
        setLoading(false)
    };
    return (
        <div>
            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                type="button"
                onClick={handleGoogleSignIn}
            >
                <img
                    width="40"
                    height="40"
                    src={
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
                    }
                    alt="Google"
                />
                {loading && !success ? (
                    <CircularProgress color="inherit" />
                ) : (" Sign In with Google"
                )
                }
            </Button>
        </div>
    )
}

export default Login