import {
    useSelector,
    ImageList, ImageListItem, Typography, Container,
} from '@/Utils/export'
import { registerEngagement } from '@/redux/uploadSlice';
import useFetchFirebase from '@/hooks/useFetchFirebase';
import TilesSkeleton from '@/components/Skeletons/Tiles';
import BottomPictureBar from '@/components/BottomPictureBar';
const type = 'engagement';

export default function Engagement() {
    const { isLoading, isInitialLoading } = useFetchFirebase({
        type,
        register: registerEngagement,
        folder: 'images'
    })
    const { engagement } = useSelector(state => state.uploads)
    return (
        <Container>
            {(isInitialLoading || isLoading) ?
                <TilesSkeleton /> :
                (<>
                    <Typography variant='h3' align='center'>Engagement Day</Typography>
                    <Typography variant='caption' align='center'>22nd May 2022</Typography>
                    <ImageList variant="masonry" cols={1} gap={8}>

                        {engagement.map((pic, index) => (
                            <ImageListItem key={index}>
                                <img
                                    src={`${pic}?w=248&fit=crop&auto=format`}
                                    srcSet={`${pic}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={pic ? pic.slice(100, 110) : 'some-pic'}
                                    loading="lazy"
                                    key={index}
                                />
                                <BottomPictureBar pic={pic} type={type} />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </>)}
        </Container>
    );
}


// import {
//     useDispatch,
//     useSelector,
//     useEffect,
//     useState,
//     ImageList,
//     ImageListItem,
//     Typography,
//     Container,
//     useQuery,
//     ref,
//     getDownloadURL,
//     listAll,
// } from '@/Utils/export'
// import { storage } from "@/Utils/firebase";
// import TilesSkeleton from '@/components/Skeletons/Tiles';
// import { registerEngagement } from '@/redux/uploadSlice';
// const imageRefs = (props) => ref(storage, `images/${props}`);

// export default function Engagement() {
//     const { engagement } = useSelector(state => state.uploads)
//     const dispatch = useDispatch()
//     const [localData, setLocalData] = useState([])

//     const fetchPhotos = async (imagesListRef) => {
//         return await listAll(imagesListRef).then((response) => {
//             return response.items
//         });
//     }

//     const { data, isLoading } = useQuery({
//         queryKey: ['engagement'],
//         queryFn: () => fetchPhotos(imageRefs('engagement')),
//     })

//     useEffect(() => {
//         if (data) setLocalData(data)
//     }, [data])

//     useEffect(() => {
//         if (localData) {
//             localData.forEach(item => {
//                 getDownloadURL(item).then((url) => {
//                     if (!engagement.includes(url)) {
//                         dispatch(registerEngagement(url))
//                     }
//                 })
//             })
//         }
//     }, [localData])

//     return (
//         <Container>
//             {isLoading ? <TilesSkeleton /> : (<>
//                 <Typography variant='h3' align='center'>Engagement Day</Typography>
//                 <Typography variant='caption' align='center'>22nd May 2022</Typography>
//                 <ImageList variant="masonry" cols={1} gap={8}>

//                     {engagement.map((pic, index) => (
//                         <ImageListItem key={index} onClick={() => console.log("clicked image list")}>
//                             <img
//                                 src={`${pic}?w=248&fit=crop&auto=format`}
//                                 srcSet={`${pic}?w=248&fit=crop&auto=format&dpr=2 2x`}
//                                 alt={pic ? pic.slice(3) : 'some-pic'}
//                                 loading="lazy"
//                                 key={index}
//                             />
//                         </ImageListItem>
//                     ))}
//                 </ImageList>
//             </>)}
//         </Container>
//     );
// }

// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { ImageList, ImageListItem, Typography, Container } from '@mui/material'
// import { useQuery } from '@tanstack/react-query'
// import {
//     ref,
//     getDownloadURL,
//     listAll,
// } from "firebase/storage";