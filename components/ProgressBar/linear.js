import { registerProgress } from '@/redux/utilsSlice';
import {
    useEffect,
    useDispatch, useSelector,
    LinearProgress, Typography,
    Box,
    PropTypes
} from '@/Utils/export'

export default function ProgressBarLinear(props) {
    const { progress } = useSelector(state => state.utils)
    const dispatch = useDispatch();

    useEffect(() => {
        if (progress === 100) {
            setTimeout(() => {
                dispatch(registerProgress(0))
            }, 3000)
        }
    }, [progress === 100])


    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="white">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

ProgressBarLinear.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

//  function ProgressBarLinear() {
//     const [progress, setProgress] = useState(10);

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
//         }, 800);
//         return () => {
//             clearInterval(timer);
//         };
//     }, []);

//     return (
//         <Box sx={{ width: '100%' }}>
//             <LinearProgressWithLabel value={progress} />
//         </Box>
//     );
// }
