import { createSlice } from '@/Utils/export'

const initialState = {
    innerWidth: 390,
    opts: {
        height: 490,
        width: 390,
        playerVars: {
            autoplay: 0,
        },
    },
}

export const youTubeSlice = createSlice({
    name: 'youtube',
    initialState,
    reducers: {
        registerWindowWidth: (state, action) => {
            state.innerWidth = action.payload;
        },
        registerOpts: (state, action) => {
            const { height, width } = action.payload
            if (height) {
                state.opts.height = height;
            }
            if (width) {
                state.opts.width = width;
            }
        },
    }
})

export const { registerWindowWidth, registerOpts } = youTubeSlice.actions

export default youTubeSlice.reducer;