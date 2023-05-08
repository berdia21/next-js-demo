import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "./AuthForm.module.scss";
import Button from "../common/Button";

// This gets handled by the [...nextauth] endpoint
function AuthForm() {
  const [registered, setRegistered] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [accountName, setAccountName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  // We keep track of whether in a login / or register state
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const error = router.query.error;

  async function createUser(userName, name, password) {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ userName, name, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setServerError(data.message || "Something went wrong!");
      throw new Error(data.message || "Something went wrong!");
    }

    return data;
  }

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
    setAccountName("");
    setName("");
    setPassword("");
    setConfirmPassword("");
    setPasswordsMatch(true);
  }

  async function submitHandler(event) {
    event.preventDefault();

    if (isLogin) {
      try {
        await signIn("credentials", {
          redirect: "/",
          userName: accountName,
          password: password,
        });
      } catch (e) {
        console.log("error", e);
      }
    } else {
      if (password === confirmPassword) {
        try {
          await createUser(accountName, name, password);
          setRegistered(true);
        } catch (error) {
          console.log(error);
        }
      } else {
        setPasswordsMatch(false);
      }
    }
  }

  const noSpaceHandler = (event) => {
    if (event.code === "Space") event.preventDefault();
  };

  return (
    <section className={styles["auth-form"]}>
      {!registered ? (
        <>
          <h1 className={styles["form-title"]}>
            {isLogin ? "Login" : "Sign Up"}
          </h1>
          <form onSubmit={submitHandler} className={styles.form}>
            <div className={styles["form-control"]}>
              <input
                type="text"
                id="userName"
                required
                minLength={3}
                placeholder=" "
                onKeyDown={noSpaceHandler}
                value={accountName}
                onChange={(event) => setAccountName(event.target.value)}
              />
              <label htmlFor="userName">Account Name</label>
            </div>
            {!isLogin && (
              <div className={styles["form-control"]}>
                <input
                  type="text"
                  id="name"
                  required
                  minLength={2}
                  placeholder=" "
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  onKeyDown={noSpaceHandler}
                />
                <label htmlFor="name">Name</label>
              </div>
            )}
            <div className={styles["form-control"]}>
              <input
                type="password"
                id="password"
                minLength={8}
                placeholder=" "
                onKeyDown={noSpaceHandler}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
            </div>

            {!isLogin && (
              <>
                <div className={styles["form-control"]}>
                  <input
                    type="password"
                    id="confirmPassword"
                    minLength={8}
                    placeholder=" "
                    onKeyDown={noSpaceHandler}
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                      setPasswordsMatch(true);
                    }}
                    required
                  />
                  <label htmlFor="password">Confirm Password</label>
                  {!passwordsMatch && (
                    <div className="error-msg">Passwords do not match</div>
                  )}
                </div>
              </>
            )}

            {serverError && <div className="error-msg">{serverError}</div>}
            {error && <div className="error-msg"> {error} </div>}
            <div className={styles["btns-holder"]}>
              <Button type="submit">
                {isLogin ? "Singin" : "Create Account"}
              </Button>
              <div
                className={styles["switch-btn"]}
                onClick={switchAuthModeHandler}
              >
                {isLogin ? "No Account? Create One" : "Already a user? Signin"}
              </div>
            </div>
          </form>
        </>
      ) : (
        <div>
          <h3>You have successfully registered!</h3>
          <Button onClick={() => router.replace("/")}>Sign In</Button>
        </div>
      )}
    </section>
  );
}

export default AuthForm;
