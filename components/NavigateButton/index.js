import {
    useRouter,
    useSelector,
    IconButton, Stack,
    ArrowForwardIosIcon, ArrowBackIosNewIcon
} from '@/Utils/export'

export const NavigateMe = () => {
    const { photoTilesTypes } = useSelector(state => state.uploads)
    const router = useRouter()
    const handleNavigation = (dir) => {
        if (dir === 'back') {
            router.back()
        }
        if (dir === 'next') {
            const nextIndex = photoTilesTypes.indexOf(router.pathname.slice(1)) + 1
            if (nextIndex) {
                const nextURL = photoTilesTypes[nextIndex]
                router.push(nextURL)
            } else {
                router.push('/')
            }
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
            >
                <ArrowBackIosNewIcon />
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
            >
                <ArrowForwardIosIcon />
            </IconButton>
        </Stack>
    </>
    )
}


export default NavigateMe

// import NextPlanIcon from '@mui/icons-material/NextPlan';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import HomeIcon from '@mui/icons-material/Home';
// import UndoIcon from '@mui/icons-material/Undo';
// import RedoIcon from '@mui/icons-material/Redo';
// export const GoHome = () => {
//     const router = useRouter()
//     const handleHome = () => {
//         router.push('/')
//     }
//     return (
//         <Stack
//             direction="column"
//             justifyContent="flex-end"
//             alignItems="center"
//             spacing={1}
//         >
//             <IconButton
//                 sx={{ opacity: '0.5', position: 'fixed', zIndex: '1050', color: 'white' }}
//                 onClick={handleHome}
//                 color="primary"
//                 aria-label="upload picture"
//                 component="label"
//             >
//                 <HomeIcon />
//             </IconButton>
//         </Stack>
//     )
// }