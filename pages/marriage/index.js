import {
    useSelector,
    ImageList, ImageListItem, Typography, Container,
} from '@/Utils/export'
import { registerMarriage } from '@/redux/uploadSlice';
import useFetchFirebase from '@/hooks/useFetchFirebase';
import TilesSkeleton from '@/components/Skeletons/Tiles';
import BottomPictureBar from '@/components/BottomPictureBar';
const type = 'marriage';

export default function Marriage() {
    const { isLoading, isInitialLoading } = useFetchFirebase({
        type,
        register: registerMarriage,
        folder: 'images'
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
                                <BottomPictureBar pic={pic} type={type} folder='images' />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </>)
            }
        </Container >
    );
}

