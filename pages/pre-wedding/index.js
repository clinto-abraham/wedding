import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ImageList, ImageListItem, Typography, Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import {
    ref,
    getDownloadURL,
    listAll,
} from "firebase/storage";
import { storage } from "@/Utils/firebase";
import TilesSkeleton from '@/components/Skeletons/Tiles';
import { registerPreWedding } from '@/redux/uploadSlice';
const imageRefs = (props) => ref(storage, `images/${props}`);

export default function PreWedding() {
    const { preWedding } = useSelector(state => state.uploads)
    const dispatch = useDispatch();
    const [localData, setLocalData] = useState([])

    const fetchPhotos = async (imagesListRef) => {
        return await listAll(imagesListRef).then((response) => {
            return response.items
        });
    }

    const { data, isLoading } = useQuery({
        queryKey: ['pre-wedding'],
        queryFn: () => fetchPhotos(imageRefs('pre-wedding')),
    })

    useEffect(() => {
        if (data) setLocalData(data)
    }, [data])

    useEffect(() => {
        if (localData) {
            localData.forEach(item => {
                getDownloadURL(item).then((url) => {
                    if (!preWedding.includes(url)) {
                        dispatch(registerPreWedding(url))
                    }
                })
            })
        }

    }, [localData])
    return (
        <Container>
            {isLoading ? <TilesSkeleton /> : (<>
                <Typography variant='h5' align='center'>Pre - Wedding Celebration</Typography>
                <Typography variant='caption' align='center'>21nd May 2022 & 24th May 2022</Typography>
                <ImageList variant="masonry" cols={3} gap={8}>

                    {preWedding.map((pic, index) => (
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
            </>)}
        </Container>
    );
}