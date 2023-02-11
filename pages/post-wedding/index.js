import {
    useSelector,
    ImageList, ImageListItem, Typography, Container,
} from '@/Utils/export'
import { registerPostWedding } from '@/redux/uploadSlice';
import useFetchFirebase from '@/hooks/useFetchFirebase';
import TilesSkeleton from '@/components/Skeletons/Tiles';
import BottomPictureBar from '@/components/BottomPictureBar';
import YouTubeVideo from '@/components/Youtube';
import PaginationFirebaseFetch from '@/components/Paginations';
const type = 'postWedding';

export default function PostWedding() {
    const { isLoading, isInitialLoading } = useFetchFirebase({
        type,
        register: registerPostWedding,
        folder: 'images'
    })
    const { postWedding } = useSelector(state => state.uploads)
    return (
        <Container>
            <Typography variant='h5' align='center' sx={{ margin: '2rem 0rem' }}>Post - Wedding Celebration</Typography>
            <YouTubeVideo ID='_ZgPMqGB2Fs' />
            {(isInitialLoading || isLoading) ?
                <TilesSkeleton /> :
                (<>
                    <Typography variant='h5' align='center' sx={{ margin: '2rem 0rem' }}>Photos</Typography>
                    <Typography variant='caption' align='center'>26th May 2022 - 3rd June 2022</Typography>
                    <ImageList variant="masonry" cols={1} gap={8}>

                        {postWedding.map((pic, index) => (
                            <ImageListItem key={index}>
                                <img
                                    src={`${pic}?w=248&fit=crop&auto=format`}
                                    srcSet={`${pic}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={pic ? pic.slice(3) : 'some-pic'}
                                    loading="lazy"
                                    key={index}
                                />
                                <BottomPictureBar pic={pic} type={type} />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    <PaginationFirebaseFetch />
                </>)}

        </Container>
    );
}


