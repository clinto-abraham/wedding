import {
    useDispatch,
    useSelector,
    useEffect,
    useState,
    ImageList,
    ImageListItem,
    Typography,
    Container,
    useQuery,
    ref,
    getDownloadURL,
    listAll,
} from '@/Utils/export'

import { storage } from "@/Utils/firebase";
import TilesSkeleton from '@/components/Skeletons/Tiles';
import { registerMarriage } from '@/redux/uploadSlice';
const imageRefs = (props) => ref(storage, `images/${props}`);

export default function Marriage() {
    const { marriage } = useSelector(state => state.uploads);
    const dispatch = useDispatch();
    const [localData, setLocalData] = useState([])

    const fetchPhotos = async (imagesListRef) => {
        return await listAll(imagesListRef).then((response) => {
            return response.items
        });
    }

    const { data, isLoading } = useQuery({
        queryKey: ['marriage'],
        queryFn: () => fetchPhotos(imageRefs('marriage')),
    })

    useEffect(() => {
        if (data) setLocalData(data)
    }, [data])

    useEffect(() => {
        if (localData) {
            localData.forEach(item => {
                getDownloadURL(item).then((url) => {
                    if (!marriage.includes(url)) {
                        dispatch(registerMarriage(url))
                    }
                })
            })
        }
    }, [localData])

    console.log('re-rendering checks in marriage')
    return (
        <Container>
            {isLoading ? <TilesSkeleton /> : (<>
                <Typography variant='h3' align='center'>Marriage Day</Typography>
                <Typography variant='caption' align='center'>22nd May 2022</Typography>
                <ImageList variant="masonry" cols={1} gap={8}>

                    {marriage.map((pic, index) => (
                        <ImageListItem key={index} onClick={() => console.log("clicked image list", pic)}>
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
            </>)}
        </Container>
    );
}


// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { ImageList, ImageListItem, Typography, Container } from '@mui/material'
// import { useQuery } from '@tanstack/react-query'
// import {
//     ref,
//     getDownloadURL,
//     listAll,
// } from "firebase/storage";

                // xs={12}
                // sm={12}
                // xl={6}
                // md={6}
                // lg={6}
            // xs={12 && dispatch(registerPhotoTileSize(12))}
            // sm={12 && dispatch(registerPhotoTileSize(12))}
            // xl={6 && dispatch(registerPhotoTileSize(6))}
            // md={6 && dispatch(registerPhotoTileSize(6))}
            // lg={6 && dispatch(registerPhotoTileSize(6))}
