import { useEffect } from 'react';
// import dynamic from 'next/dynamic'
// import { Skeleton } from '@mui/material';
import styles from '@/styles/Home.module.css'

// import clientPromise from '../lib/mongodb'
import { Header } from '@/components/Header'
import { useSelector, useDispatch } from 'react-redux'
import { storage } from "@/Utils/firebase";
import {
  registerEngagementUploadsFromFirebase,
  registerPreWeddingUploadsFromFirebase,
  registerMarriageUploadsFromFirebase,
  registerPostWeddingUploadsFromFirebase,
  registerTilePreWedding,
  registerTileEngagement,
  registerTileMarriage,
  registerTilePostWedding
} from "@/redux/uploadSlice";
import {
  ref,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import Logo from '@/components/Logo';
import PhotoTilesNavbar from '@/components/PhotoTiles';

const imageRefs = (props) => ref(storage, `images/${props}`);

// const DynamicLogo = dynamic(() => import('@/components/Logo'), {
//   loading: () => <Skeleton />,
// })

// const DynamicPhotoTilesNavbar = dynamic(() => import('@/components/PhotoTiles'), {
//   loading: () => (<>
//     <Skeleton variant="rectangular" width={210} height={118} />
//     <Skeleton />
//     <Skeleton width="60%" />
//   </>),
// })

export default function Home() {
  const { photoTilesTypes } = useSelector(state => state.uploads)
  const dispatch = useDispatch();

  const fetchPhotos = (imagesListRef) => {
    listAll(imagesListRef).then((response) => {
      // console.log('response from listAll method', response.items[0]._location.path_)
      const convertIntoURL = (register, type) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            dispatch(register(url))
            localStorage.setItem(type, url)
          });
        });
      }
      if (response.items[0]._location.path_.search('engagement') > 0) {
        convertIntoURL(registerEngagementUploadsFromFirebase, 'engagement')
      }
      if (response.items[0]._location.path_.search('post-wedding') > 0) {
        convertIntoURL(registerPostWeddingUploadsFromFirebase, 'post-wedding')
      }
      if (response.items[0]._location.path_.search('wedding') > 0) {
        convertIntoURL(registerMarriageUploadsFromFirebase, 'wedding')
      }
      if (response.items[0]._location.path_.search('pre-wedding') > 0) {
        convertIntoURL(registerPreWeddingUploadsFromFirebase, 'pre-wedding')
      }

    });
  }

  useEffect(() => {
    localStorage.clear()
    fetchPhotos(imageRefs(photoTilesTypes[0]));
    fetchPhotos(imageRefs(photoTilesTypes[1]));
    fetchPhotos(imageRefs(photoTilesTypes[2]));
    fetchPhotos(imageRefs(photoTilesTypes[3]));
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.center}>
          <Logo className={'thirteen'} />
        </div>

        <div className={styles.grid}>
          <PhotoTilesNavbar type='engagement' data='tilePreWedding' register={registerTilePreWedding} />
          <PhotoTilesNavbar type='pre-wedding' data='tileEngagement' register={registerTileEngagement} />
          <PhotoTilesNavbar type='marriage' data='tileMarriage' register={registerTileMarriage} />
          <PhotoTilesNavbar type='post-wedding' data='tilePostWedding' register={registerTilePostWedding} />
        </div>

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

// export async function getServerSideProps(context) {
//   try {
//     await clientPromise
//     return {
//       props: { isConnected: true },
//     }
//   } catch (e) {
//     console.error(e)
//     return {
//       props: { isConnected: false },
//     }
//   }
// }