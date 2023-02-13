import { configureStore } from '@reduxjs/toolkit';
import interactionSlice from './interactionSlice';
import loginSlice from './loginSlice';
import storySlice from './storySlice';
import uploadSlice from './uploadSlice';
import utilsSlice from './utilsSlice'
import youTubeSlice from './youTubeSlice';

export const store = configureStore({
    reducer: {
        utils: utilsSlice,
        uploads: uploadSlice,
        user: loginSlice,
        story: storySlice,
        youtube: youTubeSlice,
        interaction: interactionSlice
    },
})