import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {
        accessToken: '',
        displayName: '',
        email: '',
        emailVerified: false,
        isAnonymous: true,
        phoneNumber: null,
        photoURL: '',
        providerId: 'firebase',
        tenantId: null,
        uid: ''
    }
}


export const loginSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        registerUser: (state, action) => {
            state.user = action.payload;
        },
    }
})

export const { registerUser } = loginSlice.actions

export default loginSlice.reducer;