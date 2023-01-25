import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    pics: []
}

export const uploadSlice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        registerUploadsFromFirebase: (state, action) => {
            state.pics.push(action.payload);
        },
    }
})

export const { registerUploadsFromFirebase } = uploadSlice.actions

export default uploadSlice.reducer;