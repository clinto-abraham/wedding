import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Provider } from 'react-redux';
import { useState } from 'react';
import '@/styles/globals.css'
import '@/styles/NotFound.css'
import { store } from '@/redux/store';
import TopNavbar from '@/components/Navbar';
import FooterNavbar from '@/components/Footer';
import WordOfGod from '@/components/QuotesWordOfGod';
import { SnackbarProvider } from 'notistack';

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <TopNavbar />
          <WordOfGod color='white' size='2rem 1rem' />
          <Component {...pageProps} />
          <FooterNavbar />
        </SnackbarProvider>
      </Provider>
    </QueryClientProvider>
  )
}

export default MyApp;
