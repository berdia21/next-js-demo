import NoteDetails from "@/components/notes/NoteDetails";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getProfile } from "@/utils/checkUser";
import axiosInstance from "axiosConfig";

export default function NoteDetailsPage(props) {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("note")}</title>
      </Head>
      <Layout>
        <NoteDetails
          title={props.noteData?.title}
          content={props.noteData?.content}
        />
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  let notePaths = [];
  try {
    const response = await axiosInstance.get(`/notes/get-note-paths`);
    notePaths = response.data;
  } catch (error) {
    console.error(error);
  }

  return {
    fallback: "blocking",
    paths: notePaths.map((note) => ({
      params: { noteId: note._id.toString() },
    })),
  };
}

// code in this function will only run in server side on build process
export async function getStaticProps({ params, locale }) {
  const noteId = params.noteId;

  let targetNote = {};

  try {
    const response = await axiosInstance.post("/notes/get-note-detail", {
      noteId: noteId,
    });
    targetNote = response.data;
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      noteData: {
        id: targetNote?._id.toString(),
        title: targetNote?.title,
        content: targetNote?.content,
      },
    },
  };
}
