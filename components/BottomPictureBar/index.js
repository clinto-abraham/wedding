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
import { registerDelete } from '@/redux/uploadSlice';

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

export const DeleteButtonSweep = ({ pic, type, folder }) => {
    const { enqueueSnackbar } = useSnackbar();
    const storage = getStorage();
    const dispatch = useDispatch()
    const uploads = useSelector(state => state.uploads)
    const urlLength = 92 + type.length

    const deleteGlobal = (uniqueID) => {
        if (folder === 'images') {
            const tempArray = uploads[type]
            tempArray.map((url, index) => {
                if (url.search(uniqueID) > 0) {
                    const deletedURL = uploads[type][index]
                    const toBeDeletedIndex = uploads[type].indexOf(deletedURL)
                    dispatch(registerDelete({
                        type,
                        index: toBeDeletedIndex
                    }))
                }
            })
        }
    }

    const handleDelete = (id) => {
        const folderRef = ref(storage, `${folder}/${type}/${id}`);
        deleteObject(folderRef).then(() => {
            deleteGlobal(id)
            enqueueSnackbar('File deleted successfully!', { variant: 'warning' });
        }).catch((error) => {
            enqueueSnackbar(Object.values(error)[4], { variant: 'error' });
        });
    }
    return (
        <IconButton
            sx={{ color: 'white' }}
            aria-label={`Info about pics of ${pic?.slice(89, 89 + type.length)}`}
            onClick={() => {
                if (folder === 'images') {
                    handleDelete(pic.slice(urlLength, urlLength + 10))
                }
                if (folder === 'display') {
                    handleDelete(pic.slice(urlLength + 1, urlLength + 11))
                }
            }
            }
        >
            <DeleteSweepIcon />
        </IconButton>
    )
}

const BottomPictureBar = ({ pic, type, folder }) => {
    const userInfo = useAuth();
    const allowedDeleteUser = (userInfo?.email === ('clinto92@gmail.com' || 'chippynt@gmail.com')) && !userInfo?.isAnonymous
    return (
        <>
            {(allowedDeleteUser && folder === 'display')
                ? (<DeleteButtonSweep pic={pic} type={type} folder={folder} />)
                : (allowedDeleteUser && folder === 'images')
                    ? (<ImageListItemBar
                        title={'Delete one by one'}
                        subtitle={pic.slice(89, 89 + type.length)}
                        actionIcon={
                            <DeleteButtonSweep pic={pic} type={type} folder={folder} />
                        }
                    />)
                    : (<AllowedPictureBar pic={pic} />)}
        </>
    )
}

export default BottomPictureBar
