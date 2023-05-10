import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AuthForm from "../../components/auth/AuthForm";

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // check if logged in and redirect to home page if so
  useEffect(() => {
    getSession().then((session) => {
      if (session && router.route !== "/") {
        router.push("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return <AuthForm />;
}

export default AuthPage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
