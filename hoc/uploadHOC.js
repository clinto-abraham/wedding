import {
    useEffect,
    useSelector,
    Button, Typography,
    useRouter,
    Box,
} from '@/Utils/export'

const UploadPageHOC = (Component) => {
    const { user } = useSelector(state => state.user)
    const router = useRouter();
    useEffect(() => {
        if (!user || user?.isAnonymous) {
            router.push('/')
        }
    }, [user])
    return (
        <>
            {user?.email === ('clinto92@gmail.com' || 'chippynt@gmail.com') ?
                (<Component />) :
                (<Box sx={{ margin: '16rem 0rem', padding: '0rem 10rem', display: 'block' }}>
                    <Typography variant='h3'>You are not authorized to upload or change any data. Thanks for visiting us! Go back to home page and enjoy the album and don't forget to comment.</Typography>
                    <Button fullWidth sx={{ margin: '2rem 1rem' }} variant='contained' size='large' onClick={() => router.push('/')}>
                        Home
                    </Button>
                </Box>
                )
            }
        </>
    )
}

export default UploadPageHOC