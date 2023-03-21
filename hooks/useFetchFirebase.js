import {
    useDispatch, useSelector,
    useEffect, useState,
    useQuery,
    ref, getDownloadURL, listAll,
    useSnackbar
} from '@/Utils/export'
import { storage } from "@/Utils/firebase";

const useFetchFirebase = ({ type, register, folder }) => {
    const reduxTool = useSelector(state => state.uploads);
    const dispatch = useDispatch();
    const [localData, setLocalData] = useState([])
    const { enqueueSnackbar } = useSnackbar();
    const imageRefs = (props) => ref(storage, `${folder}/${props}`);
    const fetchPhotos = async (imagesListRef) => {
        return await listAll(imagesListRef).then((response) => {
            return response.items
        });
    }

    const { data, isLoading, isError, error, isSuccess, status, isInitialLoading } = useQuery({
        queryKey: [type],
        queryFn: () => fetchPhotos(imageRefs(type.toUpperCase())),
        cacheTime: 6000000,
        staleTime: 6000000,
        retryOnMount: false
    })

    useEffect(() => {
        if (data) setLocalData(data)
    }, [data])

    useEffect(() => {
        if (localData) {
            localData.forEach(item => {
                getDownloadURL(item).then((url) => {
                    if (!reduxTool[type].includes(url)) {
                        dispatch(register(url))
                    }
                })
            })
        }
    }, [localData])



    useEffect(() => {
        let timeout = true
        if (isError) {
            enqueueSnackbar(`ERROR FOR ${type.toUpperCase()} : ${error} `, { variant: 'error' });
        }
        // if (status) {
        //     enqueueSnackbar(`STATUS : ${status.toUpperCase()} FOR ${type.toUpperCase()}`, { variant: 'info' });
        // }
        if (isSuccess) {
            if (reduxTool[type].length > 0) {
                enqueueSnackbar('Successfully loaded data. Please enjoy the photos!', { variant: 'success' });
            }
            if (data.length === 0 && status === 'success') {
                enqueueSnackbar(`No photos in this ${type.toUpperCase()} category!`, { variant: 'error' });
    
            }
            return () => timeout = false;
        }
    }, [isError, isSuccess, status, reduxTool[type].length])

    return {
        isLoading,
        isInitialLoading
    }
}

export default useFetchFirebase