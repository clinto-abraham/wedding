import { ImageList, ImageListItem, Typography, Container } from '@mui/material'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DynamicRoutes() {
    const routes = useRouter()
    const [path, setPath] = useState(routes.pathname)
    const value = useSelector(state => state.uploads)
    useEffect(() => {
        const pathLocal = path.replace('/[', '').replace(']', '')
        const indexOfDash = pathLocal.indexOf('-')
        if (indexOfDash) {
            const refactoredPath = pathLocal.slice(0, indexOfDash) + pathLocal.slice(indexOfDash + 1, indexOfDash + 2).toUpperCase() + pathLocal.slice(indexOfDash + 2)
            console.log(refactoredPath)
            setPath(refactoredPath)
        }
    }, [])
    return (
        <Container >
            <Typography variant='h3' align='center'>{path} Day</Typography>
            <Typography variant='caption' align='center'>25th May 2022</Typography>
            <ImageList variant="masonry" cols={3} gap={8}>

                {value[path]?.map((pic, index) => (
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