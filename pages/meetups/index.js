import MeetupList from "../../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { hasToken } from "../../utils/checkUser";

export default function meetups(props) {
  return <MeetupList meetups={props.meetups} />;
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

  const meetupsCollection = db.collection("meetups"); // this name can be changed

  // to find all the collections (meetups)
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        description: meetup.description,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
  };
}
