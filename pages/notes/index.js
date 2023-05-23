import NoteList from "@/components/notes/NoteList";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { getProfile } from "@/utils/checkUser";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import Button from "@/components/common/Button";
import Link from "next/link";
import axiosInstance from "../../axiosConfig";

export default function Notes(props) {
  const { t } = useTranslation("common");
  const [notes, setNotes] = useState(props.notes);
  const [skip, setSkip] = useState(10);
  const session = useSession();
  const isDataFetching = useRef(false);
  const [loading, setLoading] = useState(false);

  const loadMoreNotes = async () => {
    if (isDataFetching.current) return;
    if (notes.length < skip) {
      isDataFetching.current = false;
      return;
    }
    setLoading(true);
    isDataFetching.current = true;

    try {
      setSkip((prevSkip) => prevSkip + 10);
      const response = await axiosInstance.post(
        `/notes/get-notes?limit=10&skip=${skip}`,
        { userId: session?.data?.user?._id }
      );
      const newNotes = response.data;
      setNotes((prevNotes) => [...prevNotes, ...newNotes]);
    } catch (error) {
      console.error(error);
    }

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
        {notes?.length > 0 ? (
          <NoteList notes={notes} />
        ) : (
          <div className="text-center">
            <h3> You don't have any notes yet </h3>
            <Link href="/new-note">
              <Button> Create Note </Button>
            </Link>
          </div>
        )}

        {loading && <div className="text-center loading"></div>}
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

  const requestBody = { userId: userProfile._id };
  let notes = [];
  try {
    const response = await axiosInstance.post(
      `/notes/get-notes?limit=10&skip=0`,
      requestBody
    );
    notes = response.data;
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      notes,
    },
  };
}
