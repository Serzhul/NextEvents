import Head from "next/head";
import Notification from "../components/ui/notification";

import Layout from "../components/layout/layout";
import "../styles/globals.css";
import { NotificationContextProvider } from "../store/notification-context";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name="description" content="NextJS Events" />
          <meta
            name="viewport"
            content="initil-sacle=1.0, width=deivce-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
