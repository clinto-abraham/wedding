import styles from '@/styles/Home.module.css'
import { Typography } from '@mui/material'

const Logo = ({ className }) => {
    return (
        <div className={styles[className]}>
            <Typography variant='h3'>
                C
            </Typography>
            <Typography variant='h5' sx={{ margin: '0rem 1.6rem' }}>
                &
            </Typography>
            <Typography variant='h3'>
                C
            </Typography>
        </div>
    )
}

export default Logo