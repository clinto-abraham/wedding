import { storage } from "@/Utils/firebase";
import {
    ref,
    getDownloadURL,
    listAll,
} from "firebase/storage";

const imageRefs = (props) => ref(storage, `images/${props}`);
const photoTilesTypes = ['engagement', 'pre-wedding', 'marriage', 'post-wedding'];

const useFetchPhotos = (imagesListRef) => {
    listAll(imagesListRef).then((response) => {
        // console.log('response from listAll method', response.items[0]._location.path_)
        response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
                return url
            }
            )
        });
    });
}

// import {
//     registerEngagementUploadsFromFirebase,
//     registerPreWeddingUploadsFromFirebase,
//     registerMarriageUploadsFromFirebase,
//     registerPostWeddingUploadsFromFirebase,
// } from "@/redux/uploadSlice";


// const useFetchPhotos = (imagesListRef) => {
//     return () => listAll(imagesListRef).then((response) => {
//         // console.log('response from listAll method', response.items[0]._location.path_)
//         const convertIntoURL = (register) => {
//             return () => response.items.forEach((item) => {
//                 return () => getDownloadURL(item).then((url) => {
//                     dispatch(register(url))
//                     return url
//                 });
//             });
//         }
//         if (response.items[0]._location.path_.search('engagement') > 0) {
//             return convertIntoURL(registerEngagementUploadsFromFirebase)
//         }
//         if (response.items[0]._location.path_.search('post-wedding') > 0) {
//             return convertIntoURL(registerPostWeddingUploadsFromFirebase)
//         }
//         if (response.items[0]._location.path_.search('wedding') > 0) {
//             return convertIntoURL(registerMarriageUploadsFromFirebase)
//         }
//         if (response.items[0]._location.path_.search('pre-wedding') > 0) {
//             return convertIntoURL(registerPreWeddingUploadsFromFirebase)
//         }

//     });
// }

export const getEngagementPhotos = () => useFetchPhotos(imageRefs(photoTilesTypes[0]));
export const getPreWeddingPhotos = () => useFetchPhotos(imageRefs(photoTilesTypes[1]));
export const getMarriagePhotos = () => useFetchPhotos(imageRefs(photoTilesTypes[2]));
export const getPostWeddingPhotos = () => useFetchPhotos(imageRefs(photoTilesTypes[3]));

