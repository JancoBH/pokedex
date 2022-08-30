import Router from 'next/router';
import NProgress from 'nprogress';

let timer;
let state;
let activeRequests = 0;
const delay = 250;

NProgress.configure({ showSpinner: false });

function load() {
  if (state === 'loading') {
    return;
  }

  state = 'loading';

  timer = setTimeout(function () {
    NProgress.start();
  }, delay); // only show progress bar if it takes longer than the delay
}

function stop() {
  if (activeRequests > 0) {
    return;
  }

  state = 'stop';

  clearTimeout(timer);
  NProgress.done();
}

Router.events.on('routeChangeStart', load);
Router.events.on('routeChangeComplete', stop);
Router.events.on('routeChangeError', stop);

if (typeof window !== 'undefined') {
  const originalFetch = window.fetch;
  window.fetch = async function (...args) {
    if (activeRequests === 0) {
      load();
    }

    activeRequests++;

    try {
      return await originalFetch(...args);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      activeRequests -= 1;
      if (activeRequests === 0) {
        stop();
      }
    }
  };
}

// eslint-disable-next-line react/display-name,import/no-anonymous-default-export
export default function () {
  return null;
}
