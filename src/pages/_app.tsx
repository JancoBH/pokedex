import '../styles/globals.css';

import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import store from '../app/store';
import {ThemeProvider} from 'next-themes';
import {Header, Footer} from '../components';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </Provider>
  );
}
