import Head from "next/head";
import { useSession, signIn, signUp } from "next-auth/react";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

export default function HomePage() {
  const { data: session } = useSession();
  const { t } = useTranslation("common");
  const { locale, locales } = useRouter();

  function handleSignIn(e) {
    e.preventDefault();
    signIn();
  }

  return (
    <>
      <Head>
        <title> Notes </title>
        <meta name="description" content="this is my first next app on notes" />
      </Head>

      <Layout>
        <main>
          <h1>
            {t("hello")} {session?.user?.name || t("signin-to-continue")}
          </h1>

          {locales?.map((lang, i) => (
            <React.Fragment key={i}>
              <br />
              <Link href="/" locale={lang}>
                {lang}
              </Link>
            </React.Fragment>
          ))}
        </main>
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
