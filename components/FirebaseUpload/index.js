import { useState } from "react";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";

import { Stack, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { storage } from "@/Utils/firebase";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
// import ReactUploader from "./ReactUploader";
import { registerImageUploadBase } from "@/redux/uploadSlice";
import { FileUploader } from "react-drag-drop-files";

// const imageRefs = (props) => ref(storage, `images/${props}`);

function FirebaseUpload() {
    const { imageUploadBase, photoTilesTypes, fileTypes } = useSelector(state => state.uploads)
    const [imageUrls, setImageUrls] = useState([]);
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    // const afterUploadUpdateImageURL = (imagesListRef, register) => {
    //     listAll(imagesListRef).then((response) => {
    //         response.items.forEach((item) => {
    //             console.log(response, 'response from firebase afterUploadUpdateImageURL')
    //             getDownloadURL(item).then((url) => {
    //                 // setImageUrls((prev) => [...prev, url]);
    //                 console.log(url, 'url afterUploadUpdateImageURL')
    //                 dispatch(register(url))
    //             });
    //         });
    //     });
    // }

    const handleUpload = (type) => {
        if (file?.name) {
            const imageRef = ref(storage, `images/${type}/${v4() + file.name}`);
            uploadBytes(imageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                    dispatch(registerImageUploadBase(url))
                    setFile(null)
                });
            });
        }

    };

    // useEffect(() => {
    //     // console.log('listAll', listAll(), 'list', list)
    //     // listAll(imagesListRef).then((response) => {
    //     //     response.items.forEach((item) => {
    //     //         getDownloadURL(item).then((url) => {
    //     //             setImageUrls((prev) => [...prev, url]);
    //     //             console.log(url)
    //     //             dispatch(registerUploadsFromFirebase(url))
    //     //         });
    //     //     });
    //     // });
    //     // console.log(imageRefs(photoTilesTypes[0]))
    //     // console.log(ref(storage, `images/${photoTilesTypes[0]}`))
    //     if (imageUploadBase.length) {
    //         afterUploadUpdateImageURL(imageRefs(photoTilesTypes[0]), registerEngagementUploadsFromFirebase);
    //         afterUploadUpdateImageURL(imageRefs(photoTilesTypes[1]), registerPreWeddingUploadsFromFirebase);
    //         afterUploadUpdateImageURL(imageRefs(photoTilesTypes[2]), registerMarriageUploadsFromFirebase);
    //         afterUploadUpdateImageURL(imageRefs(photoTilesTypes[3]), registerPostWeddingUploadsFromFirebase);
    //     }

    // }, []);

    // const [file, setFile] = useState(null);
    const handleFileSelect = (fileSelected) => {
        setFile(fileSelected);
        console.log(fileSelected, 'fileSelected', fileSelected[0], 'fileSelected[0]');
        // dispatch(registerImageUploadBase(file))
    };

    return (
        <div className="FirebaseUpload">
            <FileUploader
                handleChange={handleFileSelect}
                name='file'
                types={fileTypes}
                // multiple={true}
                className='upload'
                dropMessageStyle={
                    { backgroundColor: 'green' }
                }
                hoverTitle='After drag or drop or select file, do submit'
            />

            <Stack spacing={2} direction="row">
                {photoTilesTypes.map((type, i) => (
                    <Button
                        key={i + type}
                        variant='contained'
                        sx={{ minWidth: '11rem', padding: '0.5rem' }}
                        onClick={() => handleUpload(type)}
                    >
                        <CloudUploadIcon />
                        {type}
                    </Button>
                ))}
            </Stack>
        </div>
    );
}

export default FirebaseUpload;
