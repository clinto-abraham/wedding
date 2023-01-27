import { useState } from "react";
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { Stack, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { storage } from "@/Utils/firebase";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { registerImageUploadBase } from "@/redux/uploadSlice";
import { FileUploader } from "react-drag-drop-files";

function FirebaseUpload() {
    const { photoTilesTypes, fileTypes } = useSelector(state => state.uploads)
    const [imageUrls, setImageUrls] = useState([]);
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

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

    const handleFileSelect = (fileSelected) => {
        setFile(fileSelected);
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
