import "../styles/_main.scss";
import Layout from "../components/layout/Layout";
import { SessionProvider } from "next-auth/react";

import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default appWithTranslation(App);
