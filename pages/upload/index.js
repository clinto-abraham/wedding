import { useState } from "react";
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { Stack, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import storage from "@/Utils/firebase";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { registerImageUploadBase } from "@/redux/uploadSlice";
import { FileUploader } from "react-drag-drop-files";
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

function FirebaseUpload() {
    const { imageUploadBase, photoTilesTypes, fileTypes } = useSelector(state => state.uploads)
    // const [imageUrls, setImageUrls] = useState([]);
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const handleUpload = (type) => {
        if (file?.name) {
            const imageRef = ref(storage, `images/${type}/${v4().slice(0, 10)}`);
            uploadBytes(imageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    // setImageUrls((prev) => [...prev, url]);
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
        <div className={styles.upload}>
            <FileUploader
                handleChange={handleFileSelect}
                name='file'
                types={fileTypes}
                // multiple={true}
                dropMessageStyle={
                    { backgroundColor: 'green' }
                }
                hoverTitle='After drag or drop or select file, do submit'
            />

            <Stack spacing={4} direction="row" sx={{ margin: '7rem 0rem', display: 'block' }}>
                {photoTilesTypes.map((type, i) => (
                    <Button
                        key={i + type}
                        variant='contained'
                        sx={{ minWidth: '16rem', padding: '1rem', margin: '2rem 1.2rem' }}
                        onClick={() => handleUpload(type)}
                    >
                        <CloudUploadIcon sx={{ margin: '0rem 1rem' }} />
                        {type}
                    </Button>
                ))}
            </Stack>
            {imageUploadBase.length ?
                <Image
                    className={styles.logo}
                    src={imageUploadBase}
                    alt="Uploaded Image"
                    width={180}
                    height={37}
                    priority
                />
                : null}
        </div>
    );
}

export default FirebaseUpload;

// import styles from '@/styles/Home.module.css'
// import { Typography } from '@mui/material'
// import Image from 'next/image'

// export const Logo = ({ className }) => {
//     return (
//         <div className={styles[className]}>
//             <Typography variant='h3'>
//                 C
//             </Typography>
//             <Typography variant='h5' sx={{ margin: '0rem 1.6rem' }}>
//                 &
//             </Typography>
//             <Typography variant='h3'>
//                 C
//             </Typography>
//         </div>
//     )
// }

// export const NextLogo = () => (
//     <Image
//         className={styles.logo}
//         src="/next.svg"
//         alt="Next.js Logo"
//         width={180}
//         height={37}
//         priority
//     />
// )

// export default Logo
