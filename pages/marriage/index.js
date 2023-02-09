import {
    useSelector,
    ImageList, ImageListItem, Typography, Container,
} from '@/Utils/export'
import { registerMarriage } from '@/redux/uploadSlice';
import useFetchFirebase from '@/hooks/useFetchFirebase';
import TilesSkeleton from '@/components/Skeletons/Tiles';
import BottomPictureBar from '@/components/BottomPictureBar';


export default function Marriage() {
    const { isLoading, isInitialLoading } = useFetchFirebase({
        type: 'marriage',
        register: registerMarriage
    })
    const { marriage, stock } = useSelector(state => state.uploads);

    return (
        <Container>
            {(isInitialLoading || isLoading) ?
                <TilesSkeleton /> :
                (<>
                    <Typography variant='h3' align='center'>Marriage Day</Typography>
                    <Typography variant='caption' align='center'>22nd May 2022</Typography>
                    <ImageList variant="masonry" cols={1} gap={8}>

                        {(marriage || stock).map((pic, index) => (
                            <ImageListItem key={index}>
                                <img
                                    src={`${pic}?w=248&fit=crop&auto=format`}
                                    srcSet={`${pic}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={pic ? pic.slice(100, 110) : 'some-pic'}
                                    loading="lazy"
                                    key={index}
                                />
                                <BottomPictureBar pic={pic} type={'marriage'} />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </>)
            }
        </Container >
    );
}

// const EnhancedMarriage = PageHOC({ Component: Marriage, type: 'marriage', register: registerMarriage });
// export default EnhancedMarriage;

// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { ImageList, ImageListItem, Typography, Container } from '@mui/material'
// import { useQuery } from '@tanstack/react-query'
// import {
//     ref,
//     getDownloadURL,
//     listAll,
// } from "firebase/storage";











// import {
//     // useDispatch,
//     useSelector,
//     // useEffect, useState,
//     ImageList, ImageListItem, Typography, Container,
//     // useQuery,
//     // ref, getDownloadURL, listAll,
//     // useSnackbar
// } from '@/Utils/export'

// // import { storage } from "@/Utils/firebase";
// import TilesSkeleton from '@/components/Skeletons/Tiles';
// import { registerMarriage } from '@/redux/uploadSlice';
// import useFetchFirebase from '@/hooks/useFetchFirebase';
// // const imageRefs = (props) => ref(storage, `images/${props}`);

// export default function Marriage() {
//     const { isLoading } = useFetchFirebase({
//         type: 'marriage',
//         register: registerMarriage
//     })
//     const { marriage } = useSelector(state => state.uploads);
//     // const { marriage } = useSelector(state => state.uploads);
//     // const dispatch = useDispatch();
//     // const [localData, setLocalData] = useState([])
//     // // const { enqueueSnackbar } = useSnackbar();
//     // const fetchPhotos = async (imagesListRef) => {
//     //     return await listAll(imagesListRef).then((response) => {
//     //         return response.items
//     //     });
//     // }

//     // const { data, isLoading, isError, error, isSuccess, status } = useQuery({
//     //     queryKey: ['marriage'],
//     //     queryFn: () => fetchPhotos(imageRefs('marriage')),
//     // })

//     // useEffect(() => {
//     //     if (data) setLocalData(data)
//     // }, [data])

//     // useEffect(() => {
//     //     if (localData) {
//     //         localData.forEach(item => {
//     //             getDownloadURL(item).then((url) => {
//     //                 if (!marriage.includes(url)) {
//     //                     dispatch(registerMarriage(url))
//     //                 }
//     //             })
//     //         })
//     //     }
//     // }, [localData])

//     // useEffect(() => {
//     //     if (isError) {
//     //         console.log(error)
//     //         enqueueSnackbar(error, { variant: 'error' });
//     //     }
//     //     if (isSuccess) {
//     //         console.log(isSuccess)
//     //         enqueueSnackbar('Successfully loaded data. Please enjoy the photos!', { variant: 'success' });
//     //     }

//     //     if (status) {
//     //         enqueueSnackbar(status, { variant: 'info' });
//     //     }
//     // }, [isError, isSuccess])

//     console.log('re-rendering checks in marriage')
//     return (
//         <Container>
//             {isLoading ? <TilesSkeleton /> : (<>
//                 <Typography variant='h3' align='center'>Marriage Day</Typography>
//                 <Typography variant='caption' align='center'>22nd May 2022</Typography>
//                 <ImageList variant="masonry" cols={1} gap={8}>

//                     {marriage.map((pic, index) => (
//                         <ImageListItem key={index} onClick={() => console.log("clicked image list", pic)}>
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