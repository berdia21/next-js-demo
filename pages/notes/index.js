import NoteList from "../../components/notes/NoteList";
import { MongoClient } from "mongodb";
import { getProfile } from "../../utils/checkUser";
import Layout from "../../components/layout/Layout";
import { getServerSession } from "next-auth/next";
import Head from "next/head";

export default function Notes(props) {
  return (
    <>
      <Head>
        <title> Note List </title>
      </Head>
      <Layout>
        <h1> Note List </h1>
        <NoteList notes={props.notes} />
      </Layout>
    </>
  );
}

// code in this function will only run in server side on build process
export async function getServerSideProps(context) {
  const userProfile = await getProfile(context.req);
  if (!userProfile) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const client = await MongoClient.connect(
    "mongodb+srv://berdia21:Xinkali21@cluster0.h5z4lln.mongodb.net/?retryWrites=true&w=majority"
  );
  // database
  const db = client.db();

  const notesCollection = db.collection("notes"); // this name can be changed

  const notes = await notesCollection
    .find({ userId: userProfile._id })
    .sort({ createDate: -1 })
    .toArray();

  client.close();

  return {
    props: {
      notes: notes.map((note) => ({
        title: note.title,
        content: note.content,
        createDate: note.createDate.toString(),
        id: note._id.toString(),
      })),
    },
  };
}
