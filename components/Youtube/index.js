import {
    Grid, Button, 
    useSelector, useDispatch,
} from '@/Utils/export'
import YouTube from "react-youtube";
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import PhotoSizeSelectSmallIcon from '@mui/icons-material/PhotoSizeSelectSmall';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import PhotoSizeSelectLargeIcon from '@mui/icons-material/PhotoSizeSelectLarge';
import { registerOpts } from '@/redux/youTubeSlice';

const YouTubeVideo = ({ ID }) => {
    const dispatch = useDispatch();
    const { opts } = useSelector(state => state.youtube)

    // useEffect(() => {
    //     if(opts.width){
    //     console.log(opts.width, 'opts.width')
    //     if (window.innerWidth > 900) {
    //         // setHeight(700)
    //         dispatch(registerOpts({
    //             height: 700,
    //             width: window.innerWidth - 10
    //         }))
    //     }
    //     }
       
    // }, [opts.width]);

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