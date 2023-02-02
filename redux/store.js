import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './loginSlice';
import uploadSlice from './uploadSlice';
import utilsSlice from './utilsSlice'

export const store = configureStore({
    reducer: {
        utils: utilsSlice,
        uploads: uploadSlice,
        user: loginSlice
    },
})