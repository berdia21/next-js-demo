import Head from "next/head";
import { useSession, signOut, signIn, signUp } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session } = useSession();

  function handleSignIn(e) {
    e.preventDefault();
    signIn();
  }
  function handleSignOut(e) {
    e.preventDefault();
    signOut();
  }

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
        {session?.user?.email ? (
          <button onClick={handleSignOut}>Sign Out</button>
        ) : (
          <Link href="/login">
            <button onClick={handleSignIn}>Sign In</button>
          </Link>
        )}
      </main>
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
