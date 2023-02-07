import {
    useEffect,
    useDispatch, useSelector,
    Button, Grid, Typography,
    ReplayIcon, FormatQuoteIcon,
} from '@/Utils/export'

import { registerVerse } from '@/redux/utilsSlice';
import { Jesus } from '@/Utils/wordOfGod';

const chooseVerse = () => Math.ceil(Math.random() * 10)

const WordOfGod = ({ color, size }) => {
    const dispatch = useDispatch();
    const { verse } = useSelector(state => state.utils)
    useEffect(() => {
        dispatch(registerVerse(chooseVerse()))
    }, [])
    return (
        <Grid container sx={{ padding: size }}>
            <Grid item xs={12} sm={12} xl={12} md={12} lg={12} alignSelf='center'>
                <Typography variant="h5" color={color}>
                    <FormatQuoteIcon /> {Jesus[verse]} <FormatQuoteIcon />
                    <Button onClick={() => dispatch(registerVerse(chooseVerse()))}>
                        <ReplayIcon sx={{ color: color }} />
                    </Button>
                </Typography>
            </Grid>
        </Grid>
    )
}

export default WordOfGod

// import { useEffect } from 'react'
// import ReplayIcon from '@mui/icons-material/Replay';
// import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
// import { Button, Grid, Typography } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
