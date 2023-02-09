// import {
//     useDispatch, useSelector,
//     useEffect,
//     useQuery,
//     ref, getDownloadURL, listAll,
//     useSnackbar
// } from '@/Utils/export'
// import { storage } from "@/Utils/firebase";
// import {
//     registerDisplayEngagement,
//     registerDisplayPreWedding,
//     registerDisplayMarriage,
//     registerDisplayPostWedding,
// } from "@/redux/uploadSlice";
// const imageRefs = (props) => ref(storage, `display/${props}`);

// const useDisplayPic = () => {
//     const { displayTypes } = useSelector(state => state.uploads)
//     const dispatch = useDispatch();

//     const { enqueueSnackbar } = useSnackbar();
//     const fetchPhotos = (imagesListRef) => {
//         listAll(imagesListRef).then((response) => {
//             const convertIntoURL = (register) => {
//                 response.items.forEach((item) => {
//                     getDownloadURL(item).then((url) => {
//                         dispatch(register(url))
//                     });
//                 });
//             }
//             const responseSearch = (param) => response?.items[0]?._location?.path_?.search(param)
//             if (responseSearch(displayTypes[0]) > 0) {
//                 convertIntoURL(registerDisplayEngagement)
//             }
//             if (responseSearch(displayTypes[1]) > 0) {
//                 convertIntoURL(registerDisplayPreWedding)
//             }
//             if (responseSearch(displayTypes[2]) > 0) {
//                 convertIntoURL(registerDisplayMarriage)
//             }
//             if (responseSearch(displayTypes[3]) > 0) {
//                 convertIntoURL(registerDisplayPostWedding)
//             }
//         });
//     }

//     useEffect(() => {
//         // fetchPhotos(imageRefs(displayTypes[0]));
//         fetchPhotos(imageRefs(displayTypes[1]));
//         fetchPhotos(imageRefs(displayTypes[2]));
//         fetchPhotos(imageRefs(displayTypes[3]));
//     }, []);

//     const { isLoading: loadingE, isError: isErrE, error: errE, isSuccess: isSuccessE, status: statsE, isInitialLoading: initialLoadE } = useQuery({
//         queryKey: [displayTypes[0]],
//         queryFn: () => fetchPhotos(imageRefs(displayTypes[0])),
//         cacheTime: 6000000,
//         staleTime: 6000000,
//         retryOnMount: false
//     })

//     const { isLoading: loadingPre, isError: isErrPre, error: errPre, isSuccess: isSuccessPre, status: statsPre, isInitialLoading: initialLoadPre } = useQuery({
//         queryKey: [displayTypes[1]],
//         queryFn: () => fetchPhotos(imageRefs(displayTypes[1])),
//         cacheTime: 6000000,
//         staleTime: 6000000,
//         retryOnMount: false
//     })
//     const { isLoading: loadingM, isError: isErrM, error: errM, isSuccess: isSuccessM, status: statsM, isInitialLoading: initialLoadM } = useQuery({
//         queryKey: [displayTypes[2]],
//         queryFn: () => fetchPhotos(imageRefs(displayTypes[2])),
//         cacheTime: 6000000,
//         staleTime: 6000000,
//         retryOnMount: false
//     })
//     const { isLoading: loadingPost, isError: isErrPost, error: errPost, isSuccess: isSuccessPost, status: statsPost, isInitialLoading: initialLoadPost } = useQuery({
//         queryKey: [displayTypes[3]],
//         queryFn: () => fetchPhotos(imageRefs(displayTypes[3])),
//         cacheTime: 6000000,
//         staleTime: 6000000,
//         retryOnMount: false
//     })

//     useEffect(() => {
//         if ((isErrE || isErrPre || isErrM || isErrPost)) {
//             enqueueSnackbar((isErrE || isErrPre || isErrM || isErrPost), { variant: 'error' });
//         }
//         if ((isSuccessE || isSuccessPre || isSuccessM || isSuccessPost)) {
//             enqueueSnackbar('Successfully loaded data. Please navigate to see photos in each category.', { variant: 'success' });
//         }

//         if ((statsE || statsPre || statsM || statsPost)) {
//             enqueueSnackbar((statsE || statsPre || statsM || statsPost), { variant: 'info' });
//         }

//         // if (reduxTool[type].length < 1) {
//         //     enqueueSnackbar('There are no data on this page, kindly return back to another page!', { variant: 'error' });
//         // }
//     }, [(isErrE && isErrPre && isErrM && isErrPost), (isSuccessE && isSuccessPre && isSuccessM && isSuccessPost)])

//     return {
//         isLoading: (loadingE && loadingPre && loadingM && loadingPost),
//         isInitialLoading: (initialLoadE && initialLoadPre && initialLoadM && initialLoadPost)
//     }
// }

// export default useDisplayPic