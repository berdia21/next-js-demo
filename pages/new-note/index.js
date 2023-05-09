import Head from "next/head";
import { useRouter } from "next/router";
import { hasToken } from "../../utils/checkUser";
import NewNoteForm from "../../components/notes/NewNoteForm";
import Layout from "../../components/layout/Layout";

export default function NewNote() {
  const router = useRouter();

  async function addNoteHandler(noteData) {
    const response = await fetch("/api/new-notes", {
      method: "POST",
      body: JSON.stringify(noteData),
      headers: { "Content-Type": "application/json" },
    });
    const respData = await response.json();
    router.replace("/notes");
  }

  return (
    <>
      <Head>
        <title> Add New Note</title>
      </Head>
      <Layout>
        <NewNoteForm onAddNote={addNoteHandler} />
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const token = await hasToken(context.req);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
