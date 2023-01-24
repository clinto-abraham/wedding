import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import { InferGetServerSidePropsType } from 'next'
import Link from 'next/link';
import { Stack, Button, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ChangeEvent } from 'react';
import { getPhotos, postPhotos } from '../Utils/api-internal'
function convertToBase64(file: Blob){
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

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
      if(e.target.files){
        const file = e.target.files[0]; 
        const base64 = await convertToBase64(file);
        console.log(base64)  
        postPhotos('engage-pics', base64)
      }
    
    
    // setPostImage({ ...postImage, myFile : base64 })
  }

  return (
    <div className="container">
      <Head>
        <title>Clinto & Chippy</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <main>
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


        {isConnected ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
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
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
          <small>Top Of Cliff - Developers</small>
        </a>
        
      </footer>
    </div>
  )
}

export async function getServerSideProps(context: any) {
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