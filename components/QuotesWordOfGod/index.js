import { useEffect, useState } from 'react'
import ReplayIcon from '@mui/icons-material/Replay';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Jesus } from '@/Utils/wordOfGod';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerVerse } from '@/redux/utilsSlice';

const chooseVerse = () => Math.ceil(Math.random() * 10)

const WordOfGod = ({ color, size }) => {
    const dispatch = useDispatch();
    const { verse } = useSelector(state => state.utils)
    useEffect(() => {
        dispatch(registerVerse(chooseVerse()))
    }, [])
    return (
        <Box sx={{ margin: size }}>
            <Typography variant="h5" color={color}>
                <FormatQuoteIcon /> {Jesus[verse]} <FormatQuoteIcon />
                <Button onClick={() => dispatch(registerVerse(chooseVerse()))}>
                    <ReplayIcon sx={{ color: color }} />
                </Button>
            </Typography>
        </Box>
    )
}

export default WordOfGod