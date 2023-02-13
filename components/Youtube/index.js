import {
    Grid, Button, 
    useSelector, useDispatch,
    PhotoSizeSelectLargeIcon,ZoomInIcon,PhotoSizeSelectSmallIcon,ZoomOutIcon,
    YouTube,
    // useEffect,
} from '@/Utils/export'
import { registerOpts } from '@/redux/youTubeSlice';

const YouTubeVideo = ({ ID }) => {
    const dispatch = useDispatch();
    const { opts } = useSelector(state => state.youtube)

    // useEffect(() => {
    //     if (window.innerWidth > 900) {
    //         dispatch(registerOpts({
    //             height: 700,
    //             width: window.innerWidth - 10
    //         }))
    //     }
    // }, []);

    const handleDecrease = () => {
        if (opts.width > 360) {
            dispatch(registerOpts({
                height: opts.height - 10,
                width: opts.width - 200
            }))
        }
    }

    const handleIncrease = () => {
        if (opts.width < 1150) {
            dispatch(registerOpts({
                height: opts.height + 10,
                width: opts.width + 200
            }))
        }
    }
    const handleOnReady = (event) => {
        event.target.pauseVideo();
    }
    return (
        <Grid container align='center' sx={{ display: "flex" }} spacing={10}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <YouTube
                    videoId={ID}
                    opts={opts}
                    onReady={handleOnReady}
                />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} align='right'>
                <Button variant='contained' onClick={handleDecrease}>
                    <PhotoSizeSelectSmallIcon />  
                    <ZoomOutIcon /> 
                </Button>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} align='left'>
                <Button variant='contained' onClick={handleIncrease}>
                    <PhotoSizeSelectLargeIcon /> 
                    <ZoomInIcon />
                </Button>
            </Grid>
        </Grid>
    )
}

export default YouTubeVideo