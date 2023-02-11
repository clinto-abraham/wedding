import {
    useSelector, useDispatch
} from '@/Utils/export'
import { registerPage } from '@/redux/utilsSlice';
import Pagination from '@mui/material/Pagination';

const PaginationFirebaseFetch = () => {
    const { page } = useSelector(state => state.utils)
    const dispatch = useDispatch()
    const handleNext = (e) => {
        console.log(e, 'event at pagination')
        dispatch(registerPage(page + 1))
    }
    // const handlePrev = () => {
    //     dispatch(registerPage(page - 1))
    // }
    return (
        <Pagination
            sx={{ backgroundColor: 'white', margin: '2rem auto', padding: '0rem auto' }}
            color='secondary'
            count={10}
            showFirstButton
            showLastButton
            onChange={handleNext}
        />
    )
}

export default PaginationFirebaseFetch