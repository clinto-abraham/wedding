import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import { useState } from 'react';
import { Skeleton } from '@mui/material';
import dynamic from 'next/dynamic'
import '@/styles/globals.css'
import '@/styles/NotFound.css'

const DynamicTopNavbar = dynamic(() => import('@/components/Navbar'), {
  loading: () => <Skeleton variant="rectangular" width={210} height={118} />,
})

const DynamicFooter = dynamic(() => import('@/components/Footer'), {
  loading: () => <Skeleton variant="rectangular" width={210} height={118} />,
})

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <DynamicTopNavbar />
          <Component {...pageProps} />
          <DynamicFooter />
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp;
