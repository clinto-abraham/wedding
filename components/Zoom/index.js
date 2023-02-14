import {
    Grid, Button, 
    PhotoSizeSelectLargeIcon,ZoomInIcon,PhotoSizeSelectSmallIcon,ZoomOutIcon,
} from '@/Utils/export'

const ZoomControl = ({ handleDecrease, handleIncrease }) => {
  return (<>
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
        </>
  )
}

export default ZoomControl