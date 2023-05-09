import Head from "next/head";
import { useSession, signOut, signIn, signUp } from "next-auth/react";
import Link from "next/link";
import Layout from "../components/layout/Layout";

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

      <Layout>
        <main>
          <h1>Hello, {session?.user?.name || " Please Sign In To Continue"}</h1>
          {!session?.user?.userName && (
            <Link href="/login">
              <button onClick={handleSignIn}>Sign In</button>
            </Link>
          )}
        </main>
      </Layout>
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
