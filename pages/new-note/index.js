import Head from "next/head";
import { useRouter } from "next/router";
import { hasToken } from "@/utils/checkUser";
import NewNoteForm from "@/components/notes/NewNoteForm";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axiosInstance from "../../axiosConfig";

export default function NewNote() {
  const router = useRouter();
  const { t } = useTranslation("common");

  async function addNoteHandler(newNoteData) {
    try {
      await axiosInstance.post("/notes/new-note", newNoteData);
      router.replace(`${router.locale}/notes`);
    } catch (e) {
      console.error(e);
    }
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
