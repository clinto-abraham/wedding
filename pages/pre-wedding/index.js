import {
    useSelector,
    ImageList, ImageListItem, Typography, Container,
} from '@/Utils/export'
import { registerPreWedding } from '@/redux/uploadSlice';
import useFetchFirebase from '@/hooks/useFetchFirebase';
import TilesSkeleton from '@/components/Skeletons/Tiles';
import BottomPictureBar from '@/components/BottomPictureBar';
const type = 'preWedding';

export default function PreWedding() {
    const { isLoading, isInitialLoading } = useFetchFirebase({
        type,
        register: registerPreWedding,
        folder: 'images'
    })
    const { preWedding } = useSelector(state => state.uploads)
    return (
        <Container>
            {(isInitialLoading || isLoading) ?
                <TilesSkeleton /> :
                (<>
                    <Typography variant='h5' align='center'>Pre - Wedding Celebration</Typography>
                    <Typography variant='caption' align='center'>21nd May 2022 - 24th May 2022</Typography>
                    <ImageList variant="masonry" cols={1} gap={8}>

                        {preWedding.map((pic, index) => (
                            <ImageListItem key={index}>
                                <img
                                    src={`${pic}?w=248&fit=crop&auto=format`}
                                    srcSet={`${pic}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={pic ? pic.slice(3) : 'some-pic'}
                                    loading="lazy"
                                    key={index}
                                />
                                <BottomPictureBar pic={pic} type={type} folder='images' />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </>)}
        </Container>
    );
}

