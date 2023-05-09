import Link from "next/link";
import { useSession, signOut, signIn, signUp } from "next-auth/react";
import classes from "./MainNavigation.module.scss";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function MainNavigation() {
  const { data: session } = useSession();
  const { t } = useTranslation("common");

  return (
    <header className={classes.header}>
      <Link href="/" className={classes.logo}>
        Simple Notes
      </Link>

      <nav>
        <ul>
          {session?.user ? (
            <>
              <li>
                <Link href="/notes"> {t("my-notes")}</Link>
              </li>
              <li>
                <Link href="/new-note">{t("add-new-note")}</Link>
              </li>
              <li>
                <button onClick={() => signOut()}>Sign Out</button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">{t("signin")}</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
