import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    engagement: [],
    preWedding: [],
    marriage: [],
    postWedding: [],
    photoTilesTypes: ['engagement', 'pre-wedding', 'marriage', 'post-wedding'],
    imageUploadBase: [],
    fileTypes: ['JPG', 'PNG', 'GIF']
}

export const uploadSlice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        registerEngagementUploadsFromFirebase: (state, action) => {
            // state.engagement = [];
            state.engagement.push(action.payload);
        },
        registerPreWeddingUploadsFromFirebase: (state, action) => {
            // state.preWedding = [];
            state.preWedding.push(action.payload);
        },
        registerMarriageUploadsFromFirebase: (state, action) => {
            // state.marriage = [];
            state.marriage.push(action.payload);
        },
        registerPostWeddingUploadsFromFirebase: (state, action) => {
            // state.postWedding = [];
            state.postWedding.push(action.payload);
        },
        registerImageUploadBase: (state, action) => {
            // state.imageUploadBase = [];
            state.imageUploadBase = action.payload;
        },
    }
})

export const {
    registerEngagementUploadsFromFirebase,
    registerPreWeddingUploadsFromFirebase,
    registerMarriageUploadsFromFirebase,
    registerPostWeddingUploadsFromFirebase,
    registerImageUploadBase

} = uploadSlice.actions

export default uploadSlice.reducer;