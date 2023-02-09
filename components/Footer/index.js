import {
    Link,
    useRouter,
    useDispatch, useSelector,
    useEffect, useState,
    Box, BottomNavigation, BottomNavigationAction, Grid, Typography,
    FavoriteIcon, RestoreIcon, LocationOnIcon,
} from '@/Utils/export'
import { registerSelected } from '@/redux/utilsSlice';

const dateCheck = new Date()

const FooterNavbar = () => {
    const router = useRouter();
    const dispatch = useDispatch()
    const { selected } = useSelector(state => state.utils)
    const [date, setDate] = useState(2022)
    useEffect(() => {
        setDate(dateCheck.getFullYear())
    }, [date]);

    return (
        <>
            <Grid container sx={{ padding: '2.2rem 1.2rem' }}>
                <Grid item xs={6} sm={6} lg={4} md={4} >

                    <Typography>Privacy & Policy</Typography>
                </Grid>
                <Grid item xs={6} sm={6} lg={4} md={4} >
                    <Link
                        href="https://clinto.netlify.app/"
                    >
                        <Typography>Contact</Typography>

                    </Link>
                </Grid>
                <Grid item xs={6} sm={6} lg={4} md={4} >
                    <Typography>Comments</Typography>
                </Grid>

                <Grid item xs={6} sm={6} lg={4} md={4} >

                    <Typography>Terms & Conditions</Typography>
                </Grid>
                <Grid item xs={6} sm={6} lg={4} md={4} >
                    <Link
                        href="https://clinto.netlify.app/"
                    >
                        <Typography>Favorites</Typography>

                    </Link>
                </Grid>
                <Grid item xs={6} sm={6} lg={4} md={4} >
                    <Typography>About us</Typography>
                </Grid>

                <Grid item xs={6} sm={6} lg={4} md={4} >

                    <Typography>Github</Typography>
                </Grid>
                <Grid item xs={6} sm={6} lg={4} md={4} >
                    <Link
                        href="https://clinto.netlify.app/"
                    >
                        <Typography>Linkedin</Typography>

                    </Link>
                </Grid>
                <Grid item xs={6} sm={6} lg={4} md={4} >
                    <Typography>Twitter</Typography>
                </Grid>
            </Grid>
            <Box sx={{ width: '100%' }}>
                <BottomNavigation
                    showLabels
                    // value={value}
                    // onChange={(event, newValue) => setValue(newValue)}
                    sx={{ backgroundColor: 'transparent', color: 'white' }}
                >
                    <BottomNavigationAction onClick={() => router.push('privacy-policy')} label="Privacy & Policy" icon={<RestoreIcon />} sx={{ color: 'white' }} />
                    <BottomNavigationAction onClick={() => dispatch(registerSelected(!selected))} label="Favorites" icon={<FavoriteIcon />} sx={{ color: selected ? 'red' : 'white' }} />
                    <BottomNavigationAction onClick={() => router.push('terms-of-service')} label="Terms of service" icon={<LocationOnIcon />} sx={{ color: 'white' }} />
                </BottomNavigation>
                <Box sx={{ width: '100%', margin: '2px 500px' }}>
                    <Grid item xs={4}>
                        {/* <Logo /> */}
                    </Grid>
                    <Grid item xs={4}>
                        <Link
                            href="https://clinto.netlify.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Typography>Developed by Clinto Abraham Ayamkudiyil</Typography>
                            <Typography>Powered by - Top Of Cliff @ 2022 - {date}</Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={4} />
                </Box>

            </Box>
        </>
    )
}

export default FooterNavbar;

// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Box, BottomNavigation, BottomNavigationAction, Grid, Typography, } from '@mui/material';
// import RestoreIcon from '@mui/icons-material/Restore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import { useRouter } from 'next/router';