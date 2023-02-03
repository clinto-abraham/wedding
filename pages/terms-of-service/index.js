import { Button, Grid, Typography } from '@mui/material'
import React from 'react'

const TermsAndService = () => {
    return (
        <Grid container sx={{ padding: '2.1rem', margin: '2.1rem' }}>
            <Typography variant='h5'>
                Terms of service
            </Typography>

            <Typography>
                The photographs are the property of solely Clinto Abraham Ayamkudiyil & Chippy N Thomas. These are not available for any marketing purpose. If anyone wants to download the photos, kindly contact us.
            </Typography>
            <Button>
                Contact Us
            </Button>
        </Grid>
    )
}

export default TermsAndService