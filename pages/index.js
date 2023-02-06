import { useEffect } from 'react';
import styles from '@/styles/Home.module.css'
import { Header } from '@/components/Header'
import { useSelector, useDispatch } from 'react-redux'
import { storage } from "@/Utils/firebase";
import {
  registerDisplayEngagement,
  registerDisplayPreWedding,
  registerDisplayMarriage,
  registerDisplayPostWedding,
} from "@/redux/uploadSlice";
import {
  ref,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import Logo from '@/components/Logo';
import PhotoTilesNavbar from '@/components/PhotoTiles';
import { Grid } from '@mui/material';

const imageRefs = (props) => ref(storage, `display/${props}`);

export default function Home() {
  const { displayTypes } = useSelector(state => state.uploads)
  const dispatch = useDispatch();

  const fetchPhotos = (imagesListRef) => {
    listAll(imagesListRef).then((response) => {
      const convertIntoURL = (register) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            dispatch(register(url))
          });
        });
      }
      const responseSearch = (param) => response?.items[0]?._location?.path_?.search(param)
      if (responseSearch(displayTypes[0]) > 0) {
        convertIntoURL(registerDisplayEngagement)
      }
      if (responseSearch(displayTypes[1]) > 0) {
        convertIntoURL(registerDisplayPreWedding)
      }
      if (responseSearch(displayTypes[2]) > 0) {
        convertIntoURL(registerDisplayMarriage)
      }
      if (responseSearch(displayTypes[3]) > 0) {
        convertIntoURL(registerDisplayPostWedding)
      }
    });
  }

  useEffect(() => {
    localStorage.clear()
    fetchPhotos(imageRefs(displayTypes[0]));
    fetchPhotos(imageRefs(displayTypes[1]));
    fetchPhotos(imageRefs(displayTypes[2]));
    fetchPhotos(imageRefs(displayTypes[3]));
    console.log(localStorage, 'localStorage')
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.center}>
          <Logo className={'thirteen'} />
        </div>
        {/* <div className={styles.grid}> */}
        <Grid container spacing={2}>
          <PhotoTilesNavbar
            type='pre-WeddingDisplay'
            // data='tilePreWedding'
            register={registerDisplayPreWedding}
          />
          <PhotoTilesNavbar
            type='engagementDisplay'
            // data='tileEngagement'
            register={registerDisplayEngagement}
          />
          <PhotoTilesNavbar
            type='marriageDisplay'
            // data='tileMarriage'
            register={registerDisplayMarriage}
          />
          <PhotoTilesNavbar
            type='post-WeddingDisplay'
            // data='tilePostWedding'
            register={registerDisplayPostWedding}
          />
        </Grid>
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
