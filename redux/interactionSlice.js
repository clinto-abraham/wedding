import { createSlice } from '@/Utils/export'

const initialState = {
    likedPhotos: [],
    comments: []
}

export const interactionSlice = createSlice({
    name: 'interaction',
    initialState,
    reducers: {
        registerLikedPhotos: (state, action) => {
            state.likedPhotos.push(action.payload);
        },
        registerComments: (state, action) => {
            state.comments = action.payload;
        },
    }
})

export const { registerLikedPhotos, registerComments } = interactionSlice.actions

export default interactionSlice.reducer;