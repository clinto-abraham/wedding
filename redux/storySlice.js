import { createSlice } from '@/Utils/export'

const initialState = {
    chippy: 'Chippy born on 30th March 1995',
    chippyFamily: 'Her family consists of Mr. Chindu N Thomas (Brother), Mrs. Cicily N Thomas (Mother), and late Mr. Thomas Nelluvelil (Father)',
    chippyEdu: 'She has studied Pharm D and licensed to prescribe medicines in India, right now working in a pharmaceutical company based of Bangalore office.',
    clinto: 'Clinto born on 25th May 1992',
    clintoFamily: 'His family consists of Mr. Abraham Ayamkudiyil C (Father), Mrs. Mini A Abraham (Mother), and Ms Sneha A Abraham (sister)',
    clintoEdu: 'He has studied Bachelors of Mechanical Engineering from Bhilai, C.G., and working as Software engineer (web development) in a multi-national company: Srijan: A material Plus, based on Delhi office.'
}

export const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        registerStory: (state, action) => {
            if (action.payload === 'chippy') {
                state.chippy = action.payload
            } else if (action.payload === 'clinto') {
                state.clinto = action.payload
            }
        },
    }
})

export const { registerStory } = storySlice.actions

export default storySlice.reducer;