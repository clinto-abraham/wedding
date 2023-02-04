import { ImageList, ImageListItem, Typography, Container } from '@mui/material'
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query'
import {
    ref,
    getDownloadURL,
    listAll,
} from "firebase/storage";
import { storage } from "@/Utils/firebase";
import { useEffect, useState } from 'react';
const imageRefs = (props) => ref(storage, `images/${props}`);

export default function PostWedding() {
    const { postWedding } = useSelector(state => state.uploads)
    const [URL, setURL] = useState([])
    const [localData, setLocalData] = useState([])

    const fetchPhotos = async (imagesListRef) => {
        return await listAll(imagesListRef).then((response) => {
            return response.items
        });
    }

    const { data } = useQuery({
        queryKey: ['post-wedding'],
        queryFn: () => fetchPhotos(imageRefs('post-wedding')),
        initialData: postWedding,
    })

    useEffect(() => {
        if (data) {
            setLocalData(data)
        }

    }, [data])

    useEffect(() => {
        if (localData) {
            localData.forEach(item => {
                getDownloadURL(item).then((url) => {
                    setURL(prev => [...prev, url])
                })
            })
        }

    }, [localData])
    return (
        <Container >
            <Typography variant='h5' align='center'>Post - Wedding Celebration</Typography>
            <Typography variant='caption' align='center'>21nd May 2022 & 24th May 2022</Typography>
            <ImageList variant="masonry" cols={3} gap={8}>

                {URL.map((pic, index) => (
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