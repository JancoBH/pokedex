import '../styles/globals.css';

import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import store from '../app/store';
import {ThemeProvider} from 'next-themes';
import {Header, Footer} from '../components';
import 'nprogress/nprogress.css';
import dynamic from 'next/dynamic';

export default function MyApp({ Component, pageProps }: AppProps) {

  const TopProgressBar = dynamic(
    () => {
      return import('../components/loading/TopProgressBar');
    },
    { ssr: true },
  );

  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <TopProgressBar />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </Provider>
  );
}
