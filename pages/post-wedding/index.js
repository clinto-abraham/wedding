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
import { registerPostWedding } from '@/redux/uploadSlice';
const imageRefs = (props) => ref(storage, `images/${props}`);

export default function PostWedding() {
    const { postWedding } = useSelector(state => state.uploads)
    const dispatch = useDispatch();
    const [localData, setLocalData] = useState([])

    const fetchPhotos = async (imagesListRef) => {
        return await listAll(imagesListRef).then((response) => {
            return response.items
        });
    }

    const { data, isLoading } = useQuery({
        queryKey: ['post-wedding'],
        queryFn: () => fetchPhotos(imageRefs('post-wedding')),
    })

    useEffect(() => {
        if (data) setLocalData(data)
    }, [data])

    useEffect(() => {
        if (localData) {
            localData.forEach(item => {
                getDownloadURL(item).then((url) => {
                    if (!postWedding.includes(url)) {
                        dispatch(registerPostWedding(url))
                    }
                })
            })
        }

    }, [localData])
    return (
        <Container>
            {isLoading ? <TilesSkeleton /> : (<>
                <Typography variant='h5' align='center'>Post - Wedding Celebration</Typography>
                <Typography variant='caption' align='center'>21nd May 2022 & 24th May 2022</Typography>
                <ImageList variant="masonry" cols={3} gap={8}>

                    {postWedding.map((pic, index) => (
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