import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Fragment } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Component {...pageProps} />
    </Fragment>
  )
    ;
}

export default MyApp
