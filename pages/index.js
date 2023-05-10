import Head from "next/head";
import { useSession, signIn, signUp } from "next-auth/react";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function HomePage() {
  const { data: session } = useSession();
  const { t } = useTranslation("common");

  function handleSignIn(e) {
    e.preventDefault();
    signIn();
  }

  return (
    <>
      <Head>
        <title> {t("notes")} </title>
        <meta name="description" content="this is my first next app on notes" />
      </Head>

      <Layout>
        <h1 className="text-center">
          {t("hello")} {session?.user?.name || t("signin-to-continue")}
        </h1>
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
