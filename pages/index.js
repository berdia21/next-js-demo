import MeetupList from "../components/meetups/MeetupList";
import { useState, useEffect } from "react";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { useSession, signOut, signIn, signUp } from "next-auth/react";
import Link from "next/link";

export default function HomePage(props) {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title> React Meetups </title>
        <meta
          name="description"
          content="this is my first next app on meetups"
        />
      </Head>

      <main>
        <h1>Hello {session?.user?.email || "Unknown"}</h1>
        <Link href="/login">
          <button onClick={() => signIn()}>Sign In</button>
        </Link>
        <button onClick={() => signOut()}>Sign Out</button>
      </main>

      {session && <MeetupList meetups={props.meetups} />}
    </>
  );
}

// export async function getServerSideProps(context) {
//   const request = context.req;
//   const response = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// code in this function will only run in server side on build process
export async function getStaticProps() {
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
    // number in seconds, frequency to regenerte this page
    revalidate: 10,
  };
}
