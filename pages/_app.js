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

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <TopNavbar />
        <WordOfGod color='white' size='2rem 10rem' />
        <Component {...pageProps} />
        <FooterNavbar />
      </Provider>
    </QueryClientProvider>
  )
}

export default MyApp;
