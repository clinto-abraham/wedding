import { registerPathname } from '@/redux/utilsSlice'
import {
    useEffect,
    useRouter,
    useSelector, useDispatch,
    IconButton, Stack,
    ArrowForwardIosIcon, ArrowBackIosNewIcon,
} from '@/Utils/export'

export const NavigateMe = () => {
    const { photoTilesTypes } = useSelector(state => state.uploads)
    const { pathname } = useSelector(state => state.utils)
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        if (router?.pathname) dispatch(registerPathname(router?.pathname))
    }, [router?.pathname])

    const handleNavigation = (dir) => {
        if (dir === 'back') {
            router.back()
        }
        if (dir === 'next') {
            const nextIndex = photoTilesTypes.indexOf(router.pathname.slice(1)) + 1
            const nextURL = photoTilesTypes[nextIndex]
            router.push(nextURL)
        }
    }
    return (<>
        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={0}
        >
            <IconButton
                sx={{ opacity: '0.5', position: 'fixed', zIndex: 1050, color: 'white' }}
                onClick={() => handleNavigation('back')}
                aria-label="Previous Page"
                component="label"
                size='large'
                disabled={pathname === '/'}
            >
                <ArrowBackIosNewIcon fontSize='large' />
            </IconButton>
        </Stack>
        <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={0}
        >
            <IconButton
                sx={{ opacity: '0.5', position: 'fixed', zIndex: 1050, color: 'white' }}
                onClick={() => handleNavigation('next')}
                aria-label="Next Page"
                component="label"
                size='large'
                disabled={pathname === '/post-wedding'}
            >
                <ArrowForwardIosIcon fontSize='large' />
            </IconButton>
        </Stack>
    </>
    )
}

export default NavigateMe
