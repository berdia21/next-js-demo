import MeetupDetails from "../../components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

export default function MeetupDetailsPage(props) {
  return (
    <>
      <Head>
        <title>Meetup | {props.meetupData?.title}</title>
        <meta name="description" content={props.meetupData?.desciption} />
      </Head>
      <MeetupDetails
        image={props.meetupData?.image}
        title={props.meetupData?.title}
        desciption={props.meetupData?.desciption}
        address={props.meetupData?.address}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://berdia21:Xinkali21@cluster0.h5z4lln.mongodb.net/?retryWrites=true&w=majority"
  );
  // database
  const db = client.db();

  const meetupsCollection = db.collection("meetups"); // this name can be changed

  // to find all the collections (meetups)
  const meetupIds = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: "blocking",
    paths: meetupIds.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

// code in this function will only run in server side on build process
export async function getStaticProps(context) {
  const metupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://berdia21:Xinkali21@cluster0.h5z4lln.mongodb.net/?retryWrites=true&w=majority"
  );
  // database
  const db = client.db();

  const meetupsCollection = db.collection("meetups"); // this name can be changed

  // to find all the collections (meetups)
  const targetMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(metupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: targetMeetup?._id.toString(),
        title: targetMeetup?.title,
        address: targetMeetup?.address,
        description: targetMeetup?.description,
        image: targetMeetup?.image,
      },
    },
  };
}
