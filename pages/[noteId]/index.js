import NoteDetails from "../../components/notes/NoteDetails";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import Layout from "../../components/layout/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function NoteDetailsPage(props) {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>
          {t("note")} | {props.noteData?.title}
        </title>
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
  const client = await MongoClient.connect(
    "mongodb+srv://berdia21:Xinkali21@cluster0.h5z4lln.mongodb.net/?retryWrites=true&w=majority"
  );
  // database
  const db = client.db();

  const notesCollection = db.collection("notes"); // this name can be changed

  // to find all the collections (notes)
  const noteIds = await notesCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: "blocking",
    paths: noteIds.map((note) => ({
      params: { noteId: note._id.toString() },
    })),
  };
}

// code in this function will only run in server side on build process
export async function getStaticProps({ params, locale }) {
  const noteId = params.noteId;

  const client = await MongoClient.connect(
    "mongodb+srv://berdia21:Xinkali21@cluster0.h5z4lln.mongodb.net/?retryWrites=true&w=majority"
  );
  // database
  const db = client.db();

  const notesCollection = db.collection("notes"); // this name can be changed

  // to find all the collections (notes)
  const targetNote = await notesCollection.findOne({
    _id: new ObjectId(noteId),
  });

  client.close();

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
