import {
  useEffect,
  useDispatch, useSelector,
  Grid,
  ref, getDownloadURL, listAll,
} from '@/Utils/export'
import styles from '@/styles/Home.module.css'
import { Header } from '@/components/Header'
import { storage } from "@/Utils/firebase";
import {
  registerDisplayEngagement,
  registerDisplayPreWedding,
  registerDisplayMarriage,
  registerDisplayPostWedding,
} from "@/redux/uploadSlice";
import Logo from '@/components/Logo';
import PhotoTilesNavbar from '@/components/PhotoTiles';
// import useDisplayPic from '@/hooks/useDisplayPic';
import TilesSkeleton from '@/components/Skeletons/Tiles';

const imageRefs = (props) => ref(storage, `display/${props}`);

export default function Home() {
  // const { isLoading, isInitialLoading } = useDisplayPic()
  const { displayTypes } = useSelector(state => state.uploads)
  const dispatch = useDispatch();
  const { chippy, chippyFamily, chippyEdu, clinto, clintoFamily, clintoEdu } = useSelector(state => state.story)

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
    fetchPhotos(imageRefs(displayTypes[0]));
    fetchPhotos(imageRefs(displayTypes[1]));
    fetchPhotos(imageRefs(displayTypes[2]));
    fetchPhotos(imageRefs(displayTypes[3]));
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className={styles.center}>
          <Logo className={'thirteen'} />
        </div>
        {/* {(isInitialLoading || isLoading) ? (<TilesSkeleton />) : ( */}
        <Grid container spacing={2}>
          <PhotoTilesNavbar type='pre-WeddingDisplay' intro={clinto} family={clintoFamily} edu={clintoEdu} />
          <PhotoTilesNavbar type='engagementDisplay' intro={chippy} family={chippyFamily} edu={chippyEdu} />
          <PhotoTilesNavbar type='marriageDisplay' intro={chippy} family={chippyFamily} edu={chippyEdu} />
          <PhotoTilesNavbar type='post-WeddingDisplay' intro={clinto} family={clintoFamily} edu={clintoEdu} />
        </Grid>
        {/* )} */}
      </main>
    </>
  )
}

// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux'
// import {
//   ref,
//   getDownloadURL,
//   listAll,
// } from "firebase/storage";
// import { Grid } from '@mui/material';






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
