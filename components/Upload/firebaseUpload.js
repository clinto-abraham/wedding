import { useState, useEffect } from "react";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import { storage } from "@/Utils/firebase";
import { v4 } from "uuid";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { registerUploadsFromFirebase } from "@/redux/uploadSlice";

function FirebaseUpload() {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const dispatch = useDispatch();
    const imagesListRef = ref(storage, "images/");
    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
            });
        });
    };

    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                    dispatch(registerUploadsFromFirebase(url))
                });
            });
        });
    }, []);

    return (
        <div className="FirebaseUpload">
            <input
                type="file"
                onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                }}
            />
            {/* <button onClick={uploadFile}> Upload Image</button>
            {imageUrls.map((url) => {
                return <img src={url} />;
            })} */}
            <Button onClick={uploadFile}>Upload</Button>
        </div>
    );
}

export default FirebaseUpload;
