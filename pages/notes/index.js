import NoteList from "../../components/notes/NoteList";
import Layout from "../../components/layout/Layout";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { getProfile } from "../../utils/checkUser";
import { useSession } from "next-auth/react";
import { MongoClient } from "mongodb";
import { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import Button from "../../components/common/Button";
import Link from "next/link";

export default function Notes(props) {
  const { t } = useTranslation("common");
  const [notes, setNotes] = useState(props.notes);
  const [skip, setSkip] = useState(10);
  const session = useSession();
  const isDataFetching = useRef(false);
  const [loading, setLoading] = useState(false);

  const loadMoreNotes = async () => {
    if (isDataFetching.current) return;
    if (notes.length + 1 < skip) {
      isDataFetching.current = false;
      return;
    }
    setLoading(true);
    isDataFetching.current = true;
    const response = await fetch(`/api/notes/get-notes?limit=10&skip=${skip}`, {
      method: "POST",
      body: JSON.stringify({ userId: session?.data?.user?._id }),
      headers: { "Content-Type": "application/json" },
    });

    const newNotes = await response.json();
    setNotes((prevNotes) => [...prevNotes, ...newNotes]);
    setSkip((prevSkip) => prevSkip + 10);
    isDataFetching.current = false;
    setLoading(false);
  };

  const handleScroll = () => {
    if (isDataFetching.current) return;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 300) {
      loadMoreNotes();
    }
  };

  const debouncedHandleScroll = debounce(handleScroll, 200);

  useEffect(() => {
    if (!session?.data?.user?._id) return;
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [notes, session]);

  return (
    <>
      <Head>
        <title> {t("note-list")} </title>
      </Head>
      <Layout>
        <h1> {t("note-list")} </h1>
        {notes.length > 0 ? (
          <NoteList notes={notes} />
        ) : (
          <div className="text-center">
            <h3> You don't have any notes yet </h3>
            <Link href="/new-note">
              <Button> Create Note </Button>
            </Link>
          </div>
        )}
        {loading && <p className="text-center">Loading...</p>}
      </Layout>
    </>
  );
}

// code in this function will only run in server side on build process
export async function getServerSideProps({ locale, req, res }) {
  const userProfile = await getProfile(req);
  if (!userProfile) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const protocol = req.headers.referer
    ? new URL(req.headers.referer).protocol
    : "http:";
  const hostname = req.headers.host;
  const fullHostname = `${protocol}//${hostname}`;

  const requestBody = JSON.stringify({ userId: userProfile._id });
  const contentLength = Buffer.byteLength(requestBody);
  console.log("contentLength *******", contentLength);
  const response = await fetch(
    `${fullHostname}/api/notes/get-notes?limit=10&skip=0`,
    {
      method: "POST",
      body: requestBody,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": contentLength,
      },
    }
  );

  const notes = await response.json();

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      notes: notes.map((note) => ({
        title: note.title,
        content: note.content,
        createDate: note.createDate.toString(),
        _id: note._id.toString(),
      })),
    },
  };
}
