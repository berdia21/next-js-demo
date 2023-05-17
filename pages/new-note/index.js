import Head from "next/head";
import { useRouter } from "next/router";
import { hasToken } from "../../utils/checkUser";
import NewNoteForm from "../../components/notes/NewNoteForm";
import Layout from "../../components/layout/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function NewNote() {
  const router = useRouter();
  const { t } = useTranslation("common");

  async function addNoteHandler(noteData) {
    const response = await fetch("/api/notes/new-notes", {
      method: "POST",
      body: JSON.stringify(noteData),
      headers: { "Content-Type": "application/json" },
    });
    const respData = await response.json();
    router.replace(`${router.locale}/notes`);
  }

  return (
    <>
      <Head>
        <title> {t("add-new-note")} </title>
      </Head>
      <Layout>
        <NewNoteForm onAddNote={addNoteHandler} />
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req, locale }) {
  const token = await hasToken(req);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
