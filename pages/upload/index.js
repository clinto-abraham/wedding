import {
    useState,
    useDispatch, useSelector,
    Stack, Button, Grid, Chip, Checkbox, Select, ListItemText, FormControl, InputLabel, OutlinedInput, MenuItem,
    ref, uploadBytes, getDownloadURL, uploadBytesResumable,
    useSnackbar,
    CloudUploadIcon,
    v4,
    FileUploader,
    Box,
} from '@/Utils/export'
import { storage } from '@/Utils/firebase';
import styles from '@/styles/Home.module.css'
import { registerImageUploadBase } from '@/redux/uploadSlice';
import UploadPageHOC from '@/hoc/uploadHOC';
import { registerProgress } from '@/redux/utilsSlice';
import ProgressBarLinear from '@/components/ProgressBar/linear';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'engagement', 'preWedding', 'marriage', 'postWedding', 'engagement Display', 'preWedding Display', 'marriage Display', 'postWedding Display',
];
const metadata = {
    contentType: 'image/jpg'
};

const MB = 1000000
const rounded = (number) => {
   return Math.round(number/MB * 5) / 5
}
function FirebaseUpload() {
    const { imageUploadBase, fileTypes } = useSelector(state => state.uploads)
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar()
    const { progress } = useSelector(state => state.utils)
    const handleUpload = (type) => {
        const folderDir = type.replace(' DISPLAY', '').trim()
        const upload = (storageDir) => {
            if (file?.name) {
                console.log(file?.name, 'file?.name')
                const storageRef = ref(storage, `${storageDir}/${folderDir}/${v4().slice(0, 10)}`);
                const uploadTask = uploadBytesResumable(storageRef, file, metadata);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progressTrack = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        dispatch(registerProgress(progressTrack))
                        enqueueSnackbar(rounded(snapshot.bytesTransferred) + 'MB out of ' + rounded(snapshot.totalBytes) + 'MB are uploaded successfully!', { variant: 'success' })
                        switch (snapshot.state) {
                            case 'paused':
                                enqueueSnackbar('Upload is paused', { variant: 'warning' })
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                enqueueSnackbar('Upload is running', { variant: 'info' })
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        switch (error.code) {
                            case 'storage/unauthorized':
                                enqueueSnackbar("User doesn't have permission to access the object", { variant: 'error' })
                                console.log("User doesn't have permission to access the object")
                                break;
                            case 'storage/canceled':
                                enqueueSnackbar("User canceled the upload", { variant: 'error' })
                                console.log("User canceled the upload")
                                break;
                            case 'storage/unknown':
                                enqueueSnackbar("Unknown error occurred, inspect error.serverResponse", { variant: 'error' })
                                console.log("Unknown error occurred, inspect error.serverResponse", error.serverResponse)
                                break;
                        }
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log(`File available at ${type}`, downloadURL);
                            enqueueSnackbar(`File available at ${type} page`, { variant: 'success' })
                            dispatch(registerImageUploadBase(downloadURL))
                            setFile(null)
                        });
                    }
                );
                uploadBytes(storageRef, file).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        dispatch(registerImageUploadBase(url))
                        setFile(null)
                    });
                });
            }
        }
        if (type.search('DISPLAY') > 0) {
            upload('display')
        }
        if (type.search('DISPLAY') < 1) {
            upload('images')
        }
    };

    const handleFileSelect = (fileSelected) => {
        setFile(fileSelected);
    };

    const [categoryType, setCategoryType] = useState([]);

    const handleCategorySelect = (event) => {
        const { target: { value } } = event;
        setCategoryType(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleClear = () => {
        setCategoryType([])
        setFile(null)
    }

    return (<>
        <Stack spacing={4} direction='row' sx={{ margin: '5rem 0rem', display: 'flex', alignItems: 'center', }}>
            <Grid container direction='row' spacing={7}>
                {progress ? (<Grid item xs={12} sm={12} md={12} lg={12} sx={{ margin: '0rem 2rem' }}><ProgressBarLinear value={progress} /></Grid>) : null}
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ margin: '0rem 2rem' }}>
                    <InputLabel id='demo-label' sx={{ color: 'white' }}>Select JPG, PNG files for uploading image</InputLabel>
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
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Button
                        variant='contained'
                        sx={{ display: 'flex', minWidth: '4rem', minHeight: '4rem', padding: '0.8rem', margin: '1rem 2.2rem' }}
                        aria-label='Clear picture selected'
                        component='label'
                        onClick={handleClear}
                    >
                        Clear
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <FormControl sx={{ display: 'flex', width: 300, backgroundColor: '#1976d2', color: 'white', minHeight: '3rem', margin: '1rem 2.2rem' }}>
                        <InputLabel id='demo-multiple-checkbox-label' sx={{ color: 'white' }}>Upload Category</InputLabel>
                        <Select
                            labelId='demo-multiple-checkbox-label'
                            id='demo-multiple-checkbox'
                            value={categoryType}
                            onChange={handleCategorySelect}
                            input={<OutlinedInput label='Tag' />}
                            // renderValue={(selected) => selected.join(', ')}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, backgroundColor: '#1976d2', color: 'white' }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {names.map((name) => (
                                <MenuItem key={name} value={name.toUpperCase()}>
                                    <Checkbox checked={categoryType.indexOf(name) > -1} />
                                    <ListItemText primary={name.toUpperCase()} />
                                </MenuItem>
                            ))}
                        </Select>

                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Button
                        variant='contained'
                        sx={{ display: 'flex', minWidth: '4rem', minHeight: '4rem', padding: '0.9rem', margin: '1rem 2.2rem' }}
                        aria-label='Upload picture selected'
                        component='label'
                        onClick={() => handleUpload(categoryType[0])}
                    >
                        <CloudUploadIcon sx={{ margin: '0rem 1rem' }} />
                        Upload
                    </Button>
                </Grid>
            </Grid>
        </Stack>

        {imageUploadBase.length ?
            <img
                className={styles.logo}
                src={imageUploadBase}
                alt='Uploaded Image'
                width={700}
                height={700}
            // priority
            />
            : null}
    </>
    );
}

const EnhancedFirebaseUpload = () => UploadPageHOC(FirebaseUpload)
export default EnhancedFirebaseUpload;


//


// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import ListItemText from '@mui/material/ListItemText';
// import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';
// import Chip from '@mui/material/Chip';

// const displayTypes = ['engagement Display', 'preWedding Display', 'marriage Display', 'postWedding Display']
// const photoTypes = ['engagement', 'preWedding', 'marriage', 'postWedding']



// const handleUploadDisplay = (type) => {
//     const folderDir = type.slice(0, -8).replace('-', '')
//     console.log(file?.name, 'file?.name', folderDir, 'folderDir')
//     if (file?.name) {
//         const imageRef = ref(storage, `display/${folderDir}/${v4().slice(0, 10)}`);
//         uploadBytes(imageRef, file).then((snapshot) => {
//             getDownloadURL(snapshot.ref).then((url) => {
//                 dispatch(registerImageUploadBase(url))
//                 setFile(null)
//             });
//         });
//     }
// };


// {
//     photoTypes.map((type, i) => (
//         <Button
//             key={i + type}
//             variant='contained'
//             sx={{ minWidth: '16rem', padding: '1rem', margin: '2rem 1.2rem' }}
//             onClick={() => handleUpload(type)}
//         >
//             <CloudUploadIcon sx={{ margin: '0rem 1rem' }} />
//             {type}
//         </Button>
//     ))
// }



{/* <Stack spacing={4} direction='row' sx={{ margin: '7rem 0rem', display: 'block' }}>
    {displayTypes.map((type, i) => (
        <Button
            key={i + type}
            variant='contained'
            sx={{ minWidth: '16rem', padding: '1rem', margin: '2rem 1.2rem' }}
            onClick={() => handleUploadDisplay(type.trim())}
        >
            <CloudUploadIcon sx={{ margin: '0rem 1rem' }} />
            {type}
        </Button>
    ))}
</Stack> */}








    // Upload file and metadata to the object 'images/mountains.jpg'
    // const storageRef = ref(storage, 'images/' + file.name);
    // const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    // uploadTask.on('state_changed',
    //     (snapshot) => {
    //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //         console.log('Upload is ' + progress + '% done');
    //         switch (snapshot.state) {
    //             case 'paused':
    //                 console.log('Upload is paused');
    //                 break;
    //             case 'running':
    //                 console.log('Upload is running');
    //                 break;
    //         }
    //     },
    //     (error) => {
    //         // A full list of error codes is available at
    //         // https://firebase.google.com/docs/storage/web/handle-errors
    //         switch (error.code) {
    //             case 'storage/unauthorized':
    //                 // User doesn't have permission to access the object
    //                 break;
    //             case 'storage/canceled':
    //                 // User canceled the upload
    //                 break;

    //             // ...

    //             case 'storage/unknown':
    //                 // Unknown error occurred, inspect error.serverResponse
    //                 break;
    //         }
    //     },
    //     () => {
    //         // Upload completed successfully, now we can get the download URL
    //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //             console.log('File available at', downloadURL);
    //         });
    //     }
    // );