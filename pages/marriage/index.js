import { ImageList, ImageListItem, Typography, Container } from '@mui/material'
import { useSelector } from 'react-redux';


export default function Marriage() {
    const { marriage } = useSelector(state => state.uploads)
    return (
        <Container >
            <Typography variant='h3' align='center'>Marriage Day</Typography>
            <Typography variant='caption' align='center'>22nd May 2022</Typography>
            <ImageList variant="masonry" cols={3} gap={8}>

                {marriage.map((pic, index) => (
                    <ImageListItem key={index} onClick={() => console.log("clicked image list")}>
                        <img
                            src={`${pic}?w=248&fit=crop&auto=format`}
                            srcSet={`${pic}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={pic ? pic.slice(3) : 'some-pic'}
                            loading="lazy"
                            key={index}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Container>
    );
}