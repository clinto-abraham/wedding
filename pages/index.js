import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import clientPromise from '../lib/mongodb'
import Link from 'next/link';
import { Stack, Button, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { postPhotos, getPhotos } from '@/Utils/api-internal'
import { FooterNavbar } from '@/components/Footer'
import { Header } from '@/components/Header'
import FirebaseUpload from '@/components/Upload/firebaseUpload';

const inter = Inter({ subsets: ['latin'] });

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

export default function Home({ isConnected }) {

  const handleFileUpload = async (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      postPhotos('engage-pics', base64)
    }
  }
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.description}>
          <Stack spacing={2} direction="row">
            <Button variant='outlined'>
              <Link href={'engagement'}>
                See engagement photos
              </Link>
            </Button>

            <Button variant='contained'>
              <Link href={'marriage'}>
                See marriage photos
              </Link>
            </Button>
          </Stack>

          <FirebaseUpload />
          <div>
            {isConnected ? (
              <h2 className="subtitle">You are connected to MongoDB! Upload photos</h2>
            ) : (
              <h2 className="subtitle">
                You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
                for instructions.
              </h2>
            )}

            <IconButton color="primary" aria-label="upload picture" component="label" size='large'>
              <input
                id='image-upload'
                multiple
                hidden
                accept='.jpeg, .png, .jpg'
                type="file"
                onChange={(e) => handleFileUpload(e)}
              />
              <CloudUploadIcon />
            </IconButton>


            <Button onClick={() => getPhotos('engage-pics')}>
              Get Photos
            </Button>
          </div>

        </div>

        <div className={styles.center}>

          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div >
            <h1 className={styles.thirteen}>
              Clinto & Chippy
            </h1>

          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main>
      <FooterNavbar />
    </>
  )
}



export async function getServerSideProps(context) {
  try {
    await clientPromise
    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}