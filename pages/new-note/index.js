import Head from "next/head";
import { useRouter } from "next/router";
import { hasToken } from "../../utils/checkUser";
import NewNoteForm from "../../components/notes/NewNoteForm";

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
        <title> Simple Notes | New Note</title>
        <meta name="description" content="this is my first next app on notes" />
      </Head>
      <NewNoteForm onAddNote={addNoteHandler} />
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
