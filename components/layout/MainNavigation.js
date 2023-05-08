import Link from "next/link";
import { useSession, signOut, signIn, signUp } from "next-auth/react";
import classes from "./MainNavigation.module.scss";

function MainNavigation() {
  const { data: session } = useSession();

  return (
    <header className={classes.header}>
      <Link href="/" className={classes.logo}>
        Simple Notes
      </Link>

      <nav>
        <ul>
          {session?.user ? (
            <>
              <li>
                <Link href="/notes">All Notes</Link>
              </li>
              <li>
                <Link href="/new-note">Add New Note</Link>
              </li>
              <li>
                <button onClick={() => signOut()}>Sign Out</button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">Sign In</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
