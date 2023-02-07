import { createSlice } from '@/Utils/export'

const initialState = {
    seconds: 20,
    pushURL: false,
    color: 'white',
    selected: false,
    render: 0,
    verse: 0
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
        registerRendering: (state, action) => {
            state.render = action.payload;
        },
        registerVerse: (state, action) => {
            state.verse = action.payload;
        },
    }
})

export const { registerSeconds, registerPushURL, registerColor, registerSelected, registerRendering, registerVerse } = utilsSlice.actions

export default utilsSlice.reducer;