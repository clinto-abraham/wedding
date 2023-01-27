import { useEffect } from 'react';
import styles from '@/styles/Home.module.css'
import clientPromise from '../lib/mongodb'
// import Link from 'next/link';
// import { IconButton } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { postPhotos, getPhotos } from '@/Utils/api-internal'
// import { FooterNavbar } from '@/components/Footer'
import { Header } from '@/components/Header'
import FirebaseUpload from '@/components/FirebaseUpload';
import PhotoTilesNavbar from '@/components/PhotoTiles';
import { useSelector, useDispatch } from 'react-redux'
import Logo, { NextLogo } from '@/components/Logo';
import { storage } from "@/Utils/firebase";
import {
  registerEngagementUploadsFromFirebase,
  registerPreWeddingUploadsFromFirebase,
  registerMarriageUploadsFromFirebase,
  registerPostWeddingUploadsFromFirebase
} from "@/redux/uploadSlice";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
// const photoTilesTypes = ['engagement', 'pre-wedding', 'marriage', 'post-wedding']

// function convertToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);
//     fileReader.onload = () => {
//       resolve(fileReader.result)
//     };
//     fileReader.onerror = (error) => {
//       reject(error)
//     }
//   })
// }
// const imageRefs = () => ref(storage, `images/`);
const imageRefs = (props) => ref(storage, `images/${props}`);
const listRef = ref(storage, 'images/engagement');

export default function Home(
  // { isConnected }
) {
  const { photoTilesTypes } = useSelector(state => state.uploads)
  const dispatch = useDispatch();

  const fetchEngagement = async () => {
    // Fetch the first page of 100.
    const firstPage = await list(listRef, { maxResults: 100 });

    // Use the result.
    console.log(firstPage.items, firstPage, 'firstPage')
    console.log(firstPage.prefixes)

  }
  const afterUploadUpdateImageURL = (imagesListRef, register) => {
    list(imagesListRef).then(res => console.log('res', res))
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        console.log(response, 'response from firebase afterUploadUpdateImageURL')
        getDownloadURL(item).then((url) => {
          // setImageUrls((prev) => [...prev, url]);
          console.log(url, 'url afterUploadUpdateImageURL', url.name)
          dispatch(register(url))
        });
      });
    });
  }


  useEffect(() => {
    // console.log('listAll', listAll(), 'list', list)
    // listAll(imagesListRef).then((response) => {
    //   response.items.forEach((item) => {
    //     console.log(item)
    //   });
    // });
    // afterUploadUpdateImageURL(imageRefs)
    // console.log(imageRefs(photoTilesTypes[0]))
    // console.log(ref(storage, `images/${photoTilesTypes[0]}`))

    // if (imageUploadBase.length) {
    afterUploadUpdateImageURL(imageRefs(photoTilesTypes[0]), registerEngagementUploadsFromFirebase);
    // afterUploadUpdateImageURL(imageRefs(photoTilesTypes[1]), registerPreWeddingUploadsFromFirebase);
    // afterUploadUpdateImageURL(imageRefs(photoTilesTypes[2]), registerMarriageUploadsFromFirebase);
    // afterUploadUpdateImageURL(imageRefs(photoTilesTypes[3]), registerPostWeddingUploadsFromFirebase);
    // }
    fetchEngagement()
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.center}>
          <NextLogo />
          <Logo />
        </div>

        <div className={styles.grid}>
          {photoTilesTypes.map((type, index) => <PhotoTilesNavbar key={index + type} type={type} />)}
        </div>

        <FirebaseUpload />
      </main>
    </>
  )
}

// {
//   isConnected ? (
//     <h2 className="subtitle">You are connected to MongoDB! Upload photos</h2>
//   ) : (
//     <h2 className="subtitle">
//       You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
//       for instructions.
//     </h2>
//   )
// }

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