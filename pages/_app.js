import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import '@/styles/globals.css'
import '@/styles/NotFound.css'
import TopNavbar from '@/components/Navbar';
import { FooterNavbar } from '@/components/Footer';
// import FooterNavbar from '@/components/Footer';
// import FooterNavbar from '@/components/Footer';
// create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <TopNavbar />
        <Component {...pageProps} />
        <FooterNavbar />
      </Provider>
    </QueryClientProvider>
  )
}

export default MyApp;

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
