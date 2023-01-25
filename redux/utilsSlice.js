import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    seconds: 20,
    pushURL: false
}

export const utilsSlice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        registerSeconds: (state, action) => {
            state.seconds = action.payload;
        },
        registerPushURL: (state, action) => {
            state.pushURL = action.payload;
        },
    }
})

export const { registerSeconds, registerPushURL } = utilsSlice.actions

export default utilsSlice.reducer;