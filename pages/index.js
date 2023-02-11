import {
  useSelector,
  Grid,
} from '@/Utils/export'
import styles from '@/styles/Home.module.css'
import { Header } from '@/components/Header'
import {
  registerDisplayEngagement,
  registerDisplayPreWedding,
  registerDisplayMarriage,
  registerDisplayPostWedding,
} from "@/redux/uploadSlice";
import Logo from '@/components/Logo';
import PhotoTilesNavbar from '@/components/PhotoTiles';

export default function Home() {
  const { chippy, chippyFamily, chippyEdu, clinto, clintoFamily, clintoEdu } = useSelector(state => state.story)
  return (
    <>
      <Header />
      <main>
        <div className={styles.center}>
          <Logo className={'thirteen'} />
        </div>
        <Grid container spacing={2}>
          <PhotoTilesNavbar type='pre-WeddingDisplay' register={registerDisplayPreWedding} intro={clinto} family={clintoFamily} edu={clintoEdu} />
          <PhotoTilesNavbar type='engagementDisplay' register={registerDisplayEngagement} intro={chippy} family={chippyFamily} edu={chippyEdu} />
          <PhotoTilesNavbar type='marriageDisplay' register={registerDisplayMarriage} intro={chippy} family={chippyFamily} edu={chippyEdu} />
          <PhotoTilesNavbar type='post-WeddingDisplay' register={registerDisplayPostWedding} intro={clinto} family={clintoFamily} edu={clintoEdu} />
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

