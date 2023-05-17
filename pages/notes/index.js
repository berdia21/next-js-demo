import NoteList from "../../components/notes/NoteList";
import Layout from "../../components/layout/Layout";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { getProfile } from "../../utils/checkUser";
import { useSession } from "next-auth/react";
import { MongoClient } from "mongodb";

export default function Notes(props) {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title> {t("note-list")} </title>
      </Head>
      <Layout>
        <h1> {t("note-list")} </h1>
        <NoteList notes={props.notes} />
      </Layout>
    </>
  );
}

// code in this function will only run in server side on build process
export async function getServerSideProps({ locale, req, res }) {
  const userProfile = await getProfile(req);
  if (!userProfile) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const protocol = req.headers.referer
    ? new URL(req.headers.referer).protocol
    : "http:";
  const hostname = req.headers.host;
  const fullHostname = `${protocol}//${hostname}`;

  const response = await fetch(`${fullHostname}/api/notes/get-notes`, {
    method: "POST",
    body: JSON.stringify({ userId: userProfile._id }),

    headers: { "Content-Type": "application/json" },
  });

  const notes = await response.json();

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      notes: notes.map((note) => ({
        title: note.title,
        content: note.content,
        createDate: note.createDate.toString(),
        _id: note._id.toString(),
      })),
    },
  };
}
