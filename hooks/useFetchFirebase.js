import {
    useDispatch, useSelector,
    useEffect, useState,
    useQuery,
    ref, getDownloadURL, listAll,
    useSnackbar
} from '@/Utils/export'
import { storage } from "@/Utils/firebase";
const imageRefs = (props) => ref(storage, `images/${props}`);

const useFetchFirebase = ({ type, register }) => {
    const reduxTool = useSelector(state => state.uploads);
    const dispatch = useDispatch();
    const [localData, setLocalData] = useState([])
    const { enqueueSnackbar } = useSnackbar();
    const fetchPhotos = async (imagesListRef) => {
        return await listAll(imagesListRef).then((response) => {
            return response.items
        });
    }

    const { data, isLoading, isError, error, isSuccess, status, isInitialLoading } = useQuery({
        queryKey: [type],
        queryFn: () => fetchPhotos(imageRefs(type)),
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
        if (isError) {
            enqueueSnackbar(error, { variant: 'error' });
        }
        if (isSuccess) {
            enqueueSnackbar('Successfully loaded data. Please enjoy the photos!', { variant: 'success' });
        }

        if (status) {
            enqueueSnackbar(status, { variant: 'info' });
        }

        // if (reduxTool[type].length < 1) {
        //     enqueueSnackbar('There are no data on this page, kindly return back to another page!', { variant: 'error' });
        // }
    }, [isError, isSuccess, status])

    return {
        isLoading,
        isInitialLoading
    }
}

export default useFetchFirebase