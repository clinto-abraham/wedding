import { useEffect, useState } from 'react';
// import Image from 'next/image'
import Link from 'next/link';
// import styles from '@/styles/Home.module.css'
import { Box, BottomNavigation, BottomNavigationAction, Grid, Typography, } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// import Logo from '../Logo';
const dateCheck = new Date()
export const FooterNavbar = () => {
    const [value, setValue] = useState(0);
    const [date, setDate] = useState(2022)
    useEffect(() => {
        setDate(dateCheck.getFullYear())
    }, [date])


    return (
        <>
            <Box sx={{ width: '100%' }}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    sx={{ backgroundColor: 'transparent', color: 'white' }}
                >

                    <BottomNavigationAction label="Recents" icon={<RestoreIcon />} sx={{ color: 'white' }} />
                    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} sx={{ color: 'white' }} />
                    <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} sx={{ color: 'white' }} />
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
