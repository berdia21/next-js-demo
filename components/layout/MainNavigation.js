import Link from "next/link";
import { useSession, signOut, signIn, signUp } from "next-auth/react";
import classes from "./MainNavigation.module.css";
import { useEffect } from "react";

function MainNavigation() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
  }, []);

  return (
    <header className={classes.header}>
      <Link href="/" className={classes.logo}>
        React Meetups
      </Link>

      <nav>
        <ul>
          <li>
            <Link href="/">All Meetups</Link>
          </li>
          <li>
            <Link href="/new-meetup">Add New Meetup</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
