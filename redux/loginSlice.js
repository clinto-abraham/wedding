import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {
        accessToken: '',
        auth: {},
        displayName: 'Clinto',
        email: '',
        emailVerified: false,
        isAnonymous: true,
        metadata: {},
        phoneNumber: null,
        photoURL: '',
        proactiveRefresh: {},
        providerData: [],
        providerId: 'firebase',
        reloadListener: null,
        reloadUserInfo: {},
        stsTokenManager: {},
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