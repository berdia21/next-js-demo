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
        <title> Notes </title>
        <meta name="description" content="this is my first next app on notes" />
      </Head>

      <main>
        <h1>Hello {session?.user?.userName || "Unknown"}</h1>
        {session?.user?.userName ? (
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
//       notes: DUMMY_NOTES,
//     },
//   };
// }
