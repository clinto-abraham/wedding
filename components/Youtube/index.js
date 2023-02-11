import {
    useState,
    Grid, Button,
} from '@/Utils/export'
import YouTube from "react-youtube";
const YouTubeVideo = ({ ID }) => {
    const [height, setHeight] = useState(490)
    const [width, setWidth] = useState(350)

    const opts = {
        height,
        width,
        playerVars: {
            autoplay: 0,
        },
    };
    const handleDecrease = () => {
        if (width > 360) {
            setHeight(height - 10)
            setWidth(width - 200)
        }

    }

    const handleIncrease = () => {
        if (width < 1150) {
            setHeight(height + 10)
            setWidth(width + 200)
        }
    }
    const handleOnReady = (event) => {
        event.target.pauseVideo();
    }
    return (
        <Grid container align='center' xs={{ display: "flex" }} spacing={2}>

            <Grid item xs={12} sm={12} md={12} lg={12}>
                <YouTube
                    videoId={ID}
                    opts={opts}
                    onReady={handleOnReady}
                />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} align='right'>
                <Button variant='contained' onClick={handleDecrease}>-</Button>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} align='left'>
                <Button variant='contained' onClick={handleIncrease}>+</Button>
            </Grid>
        </Grid>
    )
}

export default YouTubeVideo