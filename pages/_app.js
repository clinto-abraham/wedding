import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import { useState } from 'react';
import '@/styles/globals.css'
import '@/styles/NotFound.css'
import TopNavbar from '@/components/Navbar';
import FooterNavbar from '@/components/Footer';

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())
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
