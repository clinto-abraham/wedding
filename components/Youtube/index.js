import {
    Grid, 
    useSelector, useDispatch,
    YouTube,
} from '@/Utils/export'
import { registerOpts } from '@/redux/youTubeSlice';
import ZoomControl from '../Zoom';

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
            <ZoomControl 
                handleDecrease={handleDecrease} 
                handleIncrease={handleIncrease} 
            />
        </Grid>
    )
}

export default YouTubeVideo