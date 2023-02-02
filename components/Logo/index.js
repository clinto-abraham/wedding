import styles from '@/styles/Home.module.css'
import { Typography } from '@mui/material'
import Image from 'next/image'

export const Logo = ({ className }) => {
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

export const NextLogo = () => (
    <Image
        className={styles.logo}
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
    />
)

export default Logo