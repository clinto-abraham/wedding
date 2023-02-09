import {
    useSelector, useDispatch,
    ImageListItemBar, IconButton,
    DeleteSweepIcon, FavoriteIcon,
    getStorage, ref, deleteObject,
    useSnackbar,
} from '@/Utils/export'
import { useAuth } from '@/hooks/useAuth';
import { registerSelected } from '@/redux/utilsSlice';
import { registerLikedPhotos } from '@/redux/interactionSlice';

const AllowedPictureBar = ({ pic }) => {
    const { selected } = useSelector(state => state.utils)
    const userInfo = useAuth();
    const dispatch = useDispatch()

    const handlePhotosLike = (URL) => {
        dispatch(registerSelected(!selected))
        dispatch(registerLikedPhotos(URL))
    }
    const allowLikeUser = userInfo?.isAnonymous === undefined
    return (
        <>
            {!allowLikeUser ? (

                <ImageListItemBar
                    title={'You are allowed to like and comment'}
                    subtitle={pic.slice(100, 110)}
                    actionIcon={
                        <IconButton
                            sx={{ color: selected ? 'red' : 'white' }}
                            aria-label={`Info about pic with ID ${pic.slice(100, 110)}`}
                            onClick={() => handlePhotosLike(pic)}
                        >
                            <FavoriteIcon />
                        </IconButton>
                    }
                />
            ) : null}
        </>
    )
}

const BottomPictureBar = ({ pic, type }) => {
    const userInfo = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const storage = getStorage();

    const handleDelete = (id) => {
        const folderRef = ref(storage, `images/${type}/${id}`);
        deleteObject(folderRef).then(() => {
            enqueueSnackbar('File deleted successfully!', { variant: 'warning' });
        }).catch((error) => {
            enqueueSnackbar(Object.values(error)[4], { variant: 'error' });
        });
    }

    const allowedDeleteUser = (userInfo?.email === ('clinto92@gmail.com' || 'chippynt@gmail.com')) && !userInfo?.isAnonymous
    return (
        <>
            {allowedDeleteUser ? (
                <ImageListItemBar
                    title={'Delete one by one'}
                    subtitle={pic.slice(100, 110)}
                    actionIcon={
                        <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`Info about pic with ID ${pic.slice(100, 110)}`}
                            onClick={() => handleDelete(pic.slice(100, 110))}
                        >
                            <DeleteSweepIcon />
                        </IconButton>
                    }
                />
            ) : (<AllowedPictureBar pic={pic} />)}
        </>
    )
}



export default BottomPictureBar
