import Link from "next/link";
import { useSession, signOut, signIn, signUp } from "next-auth/react";
import styles from "./MainNavigation.module.scss";
import { useTranslation } from "next-i18next";

import { useRouter } from "next/router";
import Button from "../common/Button";

export default function MainNavigation() {
  const { data: session } = useSession();
  const { t } = useTranslation("common");
  const { locale, locales, pathname, query } = useRouter();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
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
                <Button onClick={() => signOut()}>{t("signout")}</Button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">{t("signin")}</Link>
            </li>
          )}

          <li>
            {locales?.map((lang, i) => (
              <Link
                key={i}
                href={{
                  pathname,
                  query,
                }}
                locale={lang}
                className={`${styles["lang-item"]} ${
                  lang === locale ? "active" : ""
                }`}
              >
                {lang.toUpperCase()}
              </Link>
            ))}
          </li>
        </ul>
      </nav>
    </header>
  );
}
