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
        console.log(event.target, event.target.getPlayerState(), 'youtube event')
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


// H: true

// N: "player"

// X: Object { onReady: true, onStateChange: true, onPlaybackQualityChange: true, … }

// addCueRange: function c()
// clearVideo: function c()

// closure_uid_909214719: 3

// cuePlaylist: function c()
// cueVideoById: function c()
// cueVideoByUrl: function c()
// getApiInterface: function c()
// getAvailablePlaybackRates: function c()
// getAvailableQualityLevels: function c()
// getCurrentTime: function c()
// getDebugText: function c()
// getDuration: function c()
// getMediaReferenceTime: function c()
// getPlaybackQuality: function c()
// getPlaybackRate: function c()
// getPlayerMode: function c()
// getPlayerState: function c()
// getPlaylist: function c()
// getPlaylistId: function c()
// getPlaylistIndex: function c()
// getSize: function c()
// getSphericalProperties: function c()
// getVideoBytesLoaded: function c()
// getVideoBytesTotal: function c()
// getVideoData: function c()
// getVideoLoadedFraction: function c()
// getVideoStartBytes: function c()
// getVideoUrl: function c()
// getVolume: function c()
// h: <iframe id="widget4" allowfullscreen="1" allow="accelerometer; autoplay;…e-in-picture; web-share" title="Wedding Highlights - Clinto & Chippy" src="https://www.youtube.com/…alhost%3A3001&widgetid=3" width="390" height="490" frameborder="0">
// hideVideoInfo: function c()
// i: Object { h: {…} }

// id: 3

// isMuted: function c()
// isVideoInfoVisible: function c()

// j: 46

// loadModule: function c()
// loadPlaylist: function c()
// loadVideoById: function c()
// loadVideoByUrl: function c()
// logImaAdEvent: function c()
// m: Object { j: false, H: 22, s: 0, … }

// mute: function c()
// na: Object {  }

// nextVideo: function c()
// pauseVideo: function c()
// playVideo: function c()
// playVideoAt: function c()
// playerInfo: Object { videoBytesLoaded: 0, videoBytesTotal: 1, videoLoadedFraction: 0, … }

// previousVideo: function c()
// removeCueRange: function c()
// removeEventListener: function c()
// s: Array []

// seekTo: function c()
// setLoop: function c()
// setOption: function c()
// setPlaybackQuality: function c()
// setPlaybackRate: function c()
// setShuffle: function c()
// setSphericalProperties: function c()
// setVolume: function c()
// showVideoInfo: function c()
// stopVideo: function c()
// unMute: function c()
// unloadModule: function c()
// v: <div id="" class="">

// videoTitle: "Wedding Highlights - Clinto & Chippy"