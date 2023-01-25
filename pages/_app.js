import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import '@/styles/globals.css'
import '@/styles/NotFound.css'
// create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  )
}

export default MyApp;

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
