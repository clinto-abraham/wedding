import {
  useSelector,
  Grid, Button,
  AccountTreeIcon,
  useRouter,
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
import YouTubeVideo from '@/components/Youtube';

export default function Home() {
  const { chippy, chippyFamily, chippyEdu, clinto, clintoFamily, clintoEdu } = useSelector(state => state.story);
  const router = useRouter()
  return (
    <>
      <Header />
      <main>
        <div className={styles.center}>
          <Button 
            variant='filled'
            fullWidth
            onClick={() => router.push('family-tree')}
        >
          <Logo className={'thirteen'} />
          <AccountTreeIcon /> See Family Tree
          </Button>
        </div>
        <Grid container spacing={2}>
          <PhotoTilesNavbar type='pre-WeddingDisplay' register={registerDisplayPreWedding} intro={clinto} family={clintoFamily} edu={clintoEdu} date='May 21, 2022' />
          <PhotoTilesNavbar type='engagementDisplay' register={registerDisplayEngagement} intro={chippy} family={chippyFamily} edu={chippyEdu} date='May 22, 2022' />
          <PhotoTilesNavbar type='marriageDisplay' register={registerDisplayMarriage} intro={chippy} family={chippyFamily} edu={chippyEdu} date='May 25, 2022' />
          <PhotoTilesNavbar type='post-WeddingDisplay' register={registerDisplayPostWedding} intro={clinto} family={clintoFamily} edu={clintoEdu} date='May 26, 2022 - July 3, 2022' />
        </Grid>
        <Grid container spacing={2}>
          <YouTubeVideo ID='e-3YiD2Y5Z4' />
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

