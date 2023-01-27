import { registerImageUploadBase } from "@/redux/uploadSlice";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from "react-redux";

// const fileTypes = ["JPG", "PNG", "GIF"];

function ReactUploader() {
    const dispatch = useDispatch();
    const { fileTypes, imageUploadBase } = useSelector(state => state.uploads)
    // const [file, setFile] = useState(null);
    const handleChange = (file) => {
        // setFile(file);
        console.log(file, 'file', file[0], 'file[0]');
        dispatch(registerImageUploadBase(file))
        console.log(imageUploadBase);
    };
    return (
        <FileUploader
            handleChange={handleChange}
            name='file'
            types={fileTypes}
            // multiple={true}
            className='upload'
            dropMessageStyle={
                { backgroundColor: 'green' }
            }
            hoverTitle='After drag or drop or select file, do submit'
        />
    );
}

export default ReactUploader;

