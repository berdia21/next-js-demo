import "../styles/globals.css";

import Layout from "../components/layout/Layout";
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default App;
