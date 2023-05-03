import Head from "next/head";
import { useRouter } from "next/router";
import { hasToken } from "../../utils/checkUser";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

export default function NewMeetup() {
  const router = useRouter();

  async function addMeetupHandler(meetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: { "Content-Type": "application/json" },
    });
    const respData = await response.json();
    router.replace("/meetups");
  }

  return (
    <>
      <Head>
        <title> React Meetups | New Meetup</title>
        <meta
          name="description"
          content="this is my first next app on meetups"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
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
