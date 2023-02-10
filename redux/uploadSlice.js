import { createSlice } from '@/Utils/export'

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
    stock: ['https://firebasestorage.googleapis.com/v0/b/wedding-clinto-chippy.appspot.com/o/images%2Fengagement%2F0f0dd7ef-9f19-4762-b1f1-58ecc229d79cSCS(965).JPG?alt=media&token=88de836f-b8ad-4e0f-9c68-0d7ac8a1a0a']
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
        registerDelete: (state, action) => {
            const { type, index } = action.payload;
            if (index > -1) { // only splice array when item is found
                state[type].splice(index, 1) // 2nd parameter means remove one item only
            }

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
    registerDisplayPostWedding,
    registerDelete
} = uploadSlice.actions

export default uploadSlice.reducer;