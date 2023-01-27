import styles from '@/styles/Home.module.css'
import Image from 'next/image'

export const Logo = () => {
    return (
        <div className={styles.thirteen}>
            <h1>
                Clinto & Chippy
            </h1>
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