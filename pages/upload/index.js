import { useEffect, useState } from "react";
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { Stack, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { registerImageUploadBase } from "@/redux/uploadSlice";
import { FileUploader } from "react-drag-drop-files";
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import { storage } from "@/Utils/firebase";

function FirebaseUpload() {
    const { imageUploadBase, photoTilesTypes, fileTypes } = useSelector(state => state.uploads)
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user)
    const router = useRouter();

    useEffect(() => {
        if (!user || user?.isAnonymous) {
            router.push('/')
        }
    }, [user])

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

    return (<>
        {user?.email === ('clinto92@gmail.com' || 'chippynt@gmail.com') ? (
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
            </div>)
            : (<Box sx={{ margin: '16rem 0rem', padding: '0rem 10rem', display: 'block' }}>
                <Typography variant='h3'>You are not authorized to upload or change any data. Thanks for visiting us! Go back to home page and enjoy the album and don't forget to comment.</Typography>
                <Button fullWidth sx={{ margin: '2rem 1rem' }} variant='contained' size='large' onClick={() => router.push('/')}>
                    Home
                </Button>
            </Box>
            )
        }
    </>
    );
}

export default FirebaseUpload;
