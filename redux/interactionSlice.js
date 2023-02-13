import { createSlice } from '@/Utils/export'

const initialState = {
    likedPhotos: [],
    comments: [],
    footerItems: [
        {
            url: 'https://github.com/clinto92',
            name: 'Github',
            target: '_blank',
            rel: 'noopener noreferrer',
        },
        {
            url: 'https://www.linkedin.com/in/clinto-abraham/',
            name: 'Linkedin',
            target: '_blank',
            rel: 'noopener noreferrer',
        },
        {
            url: 'https://twitter.com/ClintoAbraham92',
            name: 'Twitter',
            target: '_blank',
            rel: 'noopener noreferrer',
        },
        {
            url: 'https://stackoverflow.com/users/14870101/clinto-92-abraham',
            name: 'Stackoverflow',
            target: '_blank',
            rel: 'noopener noreferrer',
        },
        {
            url: 'https://clinto.netlify.app/',
            name: 'Portfolio',
            target: '_blank',
            rel: 'noopener noreferrer'
        },
        {
            url: '/privacy-&-policy',
            name: 'Privacy & Policy',
            target: '_blank',
            rel: 'noopener noreferrer',
        },
        {
            url: '/terms-of-service',
            name: 'Terms Of Service',
            target: '_blank',
            rel: 'noopener noreferrer'
        },
        {
            url: '/about',
            name: 'About',
            target: '_blank',
            rel: 'noopener noreferrer',
        },
        {
            url: 'https://www.linkedin.com/in/clinto-abraham/',
            name: 'Comments',
            target: '_blank',
            rel: 'noopener noreferrer',
        },
        {
            url: '/favorites',
            name: 'Favorites',
            target: '_blank',
            rel: 'noopener noreferrer',
        },
    ]
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

export const { 
    registerLikedPhotos,
     registerComments
     } = interactionSlice.actions

export default interactionSlice.reducer;