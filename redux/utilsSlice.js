import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    seconds: 20,
    pushURL: false,
    color: 'white',
    selected: false
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
        registerColor: (state, action) => {
            state.color = action.payload;
        },
        registerSelected: (state, action) => {
            state.selected = action.payload;
        },
    }
})

export const { registerSeconds, registerPushURL, registerColor, registerSelected } = utilsSlice.actions

export default utilsSlice.reducer;