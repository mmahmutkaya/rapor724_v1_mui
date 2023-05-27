import '../styles/globals.css'
import Layout from '../components/Layout'
// import { Inter } from '@next/font/google'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
// import { useApp } from "../components/useApp.js";
import CssBaseline from '@mui/material/CssBaseline';

import StoreProvider from '../components/store'


const queryClient = new QueryClient()

// const inter = Inter({
//   subsets: ['latin'],
// })


function MyApp({ Component, pageProps }) {

  // const RealmApp = useApp()


  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        {/* <div className={inter.className}> */}
        <CssBaseline />
        <Layout >
          <Component {...pageProps} />
        </Layout>
        {/* </div> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StoreProvider>
  )
}

export default MyApp
