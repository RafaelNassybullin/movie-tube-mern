import Router from "next/router";
import NProgress from "nprogress";
import "public/fonts/font.css";
import "public/openplayer.css";
import "public/plyr.min.css";
import "nprogress/nprogress.css";
import { GlobalStyle } from "styles";
import { AppProps } from "next/app";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GlobalStyle />
    </>
  );
}

export default MyApp;