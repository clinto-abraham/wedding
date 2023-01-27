import Link from 'next/link';
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
const inter = Inter({ subsets: ['latin'] });

const PhotoTilesNavbar = props => {
    return (
        <Link
            href={`/${props.type}`}
            className={styles.card}
        >
            <h2 className={inter.className}>
                {props.type.toUpperCase()} PHOTOS <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
                See highlights of {props.type} and&nbsp; its photos here.
            </p>
        </Link>
    )
}

export default PhotoTilesNavbar;

