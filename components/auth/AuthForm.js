import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "./AuthForm.module.scss";
import Button from "../common/Button";
import { useTranslation } from "next-i18next";
import axiosInstance from "../../axiosConfig";

// This gets handled by the [...nextauth] endpoint
function AuthForm() {
  const [registered, setRegistered] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [accountName, setAccountName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  // We keep track of whether in a login / or register state
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const error = router.query.error;
  const { t } = useTranslation("common");

  async function createUser(userName, name, password) {
    try {
      const response = await axiosInstance.post("/auth/signup", {
        userName,
        name,
        password,
      });

      const data = await response;
      return data;
    } catch (error) {
      console.error(error);
      setServerError(error || "Something went wrong!");
    }
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
      await signIn("credentials", {
        redirect: "/",
        userName: accountName,
        password: password,
      });
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

  function noSpaceHandler(event) {
    if (event.code === "Space") event.preventDefault();
  }

  function togglePasswordVisibility() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  return (
    <section className={styles["auth-form"]}>
      {!registered ? (
        <>
          <h1 className={styles["form-title"]}>
            {isLogin ? t("signin") : t("signup")}
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
              <label htmlFor="userName">{t("account-name")}</label>
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
                <label htmlFor="name">{t("your-name")}</label>
              </div>
            )}
            <div className={styles["form-control"]}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                minLength={8}
                placeholder=" "
                onKeyDown={noSpaceHandler}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <label htmlFor="password">{t("password")}</label>
              {password.length > 0 && (
                <div
                  onClick={togglePasswordVisibility}
                  className={styles["input-cta"]}
                >
                  {showPassword ? t("hide") : t("show")}
                </div>
              )}
            </div>

            {!isLogin && (
              <>
                <div className={styles["form-control"]}>
                  <input
                    type={showPassword ? "text" : "password"}
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
                  {confirmPassword.length > 0 && (
                    <div
                      onClick={togglePasswordVisibility}
                      className={styles["input-cta"]}
                    >
                      {showPassword ? t("hide") : t("show")}
                    </div>
                  )}
                  <label htmlFor="password">{t("confirm-password")}</label>
                  {!passwordsMatch && (
                    <div className="error-msg">
                      {t("passwords-do-not-match")}
                    </div>
                  )}
                </div>
              </>
            )}

            {serverError && <div className="error-msg">{serverError}</div>}
            {error && <div className="error-msg"> {error} </div>}
            <div className={styles["btns-holder"]}>
              <Button type="submit">
                {isLogin ? t("signin") : t("signup")}
              </Button>
              <div
                className={styles["switch-btn"]}
                onClick={switchAuthModeHandler}
              >
                {isLogin
                  ? t("no-account-create-one")
                  : t("already-user-signin")}
              </div>
            </div>
          </form>
        </>
      ) : (
        <div>
          <h3>{t("you-have-successfully-registered")}</h3>
          <Button onClick={() => router.replace(`${router.locale}/`)}>
            {t("signin")}
          </Button>
        </div>
      )}
    </section>
  );
}

export default AuthForm;
