import Image from 'next/image'
import Link from 'next/link';
import styles from '@/styles/Home.module.css'

export const FooterNavbar = () => {
    return (
        <footer className={styles.footer}>
            <Link
                href="https://clinto.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by{' '}


                By{' '}
                <Image
                    src="/vercel.svg"
                    alt="Vercel Logo"
                    className={styles.vercelLogo}
                    width={100}
                    height={24}
                    priority
                />
                <small>Top Of Cliff - Developers</small>
            </Link>

        </footer>
    )
}
