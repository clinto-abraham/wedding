import {
    useSelector,
    ImageList, ImageListItem, Typography, Container,
} from '@/Utils/export'
import { registerEngagement } from '@/redux/uploadSlice';
import useFetchFirebase from '@/hooks/useFetchFirebase';
import TilesSkeleton from '@/components/Skeletons/Tiles';
import BottomPictureBar from '@/components/BottomPictureBar';
import YouTubeVideo from '@/components/Youtube';
import PaginationFirebaseFetch from '@/components/Paginations';
const type = 'engagement';

// 'https://youtube.com/shorts/PWrpFq6Pg8I?feature=share'

export default function Engagement() {
    const { isLoading, isInitialLoading } = useFetchFirebase({
        type,
        register: registerEngagement,
        folder: 'images'
    })
    const { engagement } = useSelector(state => state.uploads)
    return (
        <Container>
            <Typography variant='h5' align='center' sx={{ margin: '2rem 0rem' }}>Engagement Day</Typography>
            <YouTubeVideo ID='PWrpFq6Pg8I' />
            {(isInitialLoading || isLoading) ?
                <TilesSkeleton /> :
                (<>
                    <Typography variant='h5' align='center' sx={{ margin: '2rem 0rem' }}>Photos</Typography>
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
                                <BottomPictureBar pic={pic} type={type} folder='images' />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    <PaginationFirebaseFetch />
                </>)}
        </Container>
    );
}
