import MainNavigation from "./MainNavigation";
import styles from "./Layout.module.scss";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function Layout(props) {
  return (
    <>
      <MainNavigation />
      <main className={styles.main}>{props.children}</main>
    </>
  );
}

export default Layout;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
