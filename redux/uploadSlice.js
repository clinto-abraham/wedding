import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    engagement: [],
    preWedding: [],
    marriage: [],
    postWedding: [],
    photoTilesTypes: ['engagement', 'pre-wedding', 'marriage', 'post-wedding'],
    imageUploadBase: [],
    fileTypes: ['JPG', 'PNG', 'GIF'],
    engagementDisplay: [],
    preWeddingDisplay: [],
    marriageDisplay: [],
    postWeddingDisplay: [],
    displayTypes: ['engagement', 'preWedding', 'marriage', 'postWedding'],

}

export const uploadSlice = createSlice({
    name: 'uploads',
    initialState,
    reducers: {
        registerEngagement: (state, action) => {
            state.engagement.push(action.payload);
        },
        registerPreWedding: (state, action) => {
            state.preWedding.push(action.payload);
        },
        registerMarriage: (state, action) => {
            state.marriage.push(action.payload);
        },
        registerPostWedding: (state, action) => {
            state.postWedding.push(action.payload);
        },
        registerImageUploadBase: (state, action) => {
            state.imageUploadBase = action.payload;
        },
        registerDisplayEngagement: (state, action) => {
            state.engagementDisplay.shift()
            state.engagementDisplay.push(action.payload);
        },
        registerDisplayPreWedding: (state, action) => {
            state.preWeddingDisplay.shift()
            state.preWeddingDisplay.push(action.payload);
        },
        registerDisplayMarriage: (state, action) => {
            state.marriageDisplay.shift()
            state.marriageDisplay.push(action.payload);
        },
        registerDisplayPostWedding: (state, action) => {
            state.postWeddingDisplay.shift()
            state.postWeddingDisplay.push(action.payload);
        },
    }
})

export const {
    registerEngagement,
    registerPreWedding,
    registerMarriage,
    registerPostWedding,
    registerImageUploadBase,
    registerDisplayEngagement,
    registerDisplayPreWedding,
    registerDisplayMarriage,
    registerDisplayPostWedding
} = uploadSlice.actions

export default uploadSlice.reducer;