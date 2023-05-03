import NoteList from "../../components/notes/NoteList";
import { MongoClient } from "mongodb";
import { hasToken } from "../../utils/checkUser";

export default function Notes(props) {
  return <NoteList notes={props.notes} />;
}

// code in this function will only run in server side on build process
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

  const client = await MongoClient.connect(
    "mongodb+srv://berdia21:Xinkali21@cluster0.h5z4lln.mongodb.net/?retryWrites=true&w=majority"
  );
  // database
  const db = client.db();

  const notesCollection = db.collection("notes"); // this name can be changed

  // to find all the collections (notes)
  const notes = await notesCollection.find().toArray();

  client.close();

  return {
    props: {
      notes: notes.map((notes) => ({
        title: notes.title,
        content: notes.content,
        id: notes._id.toString(),
      })),
    },
  };
}
