import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

// This goes to our signup API endpoint
async function createUser(userName, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ userName, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

// This gets handled by the [...nextauth] endpoint
function AuthForm() {
  const [registered, setRegistered] = useState(false);
  const userNameRef = useRef();
  const passwordInputRef = useRef();

  // We keep track of whether in a login / or register state
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredUserNameRef = userNameRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation here

    if (isLogin) {
      await signIn("credentials", {
        redirect: "/",
        userName: enteredUserNameRef,
        password: enteredPassword,
      });
    } else {
      try {
        const result = await createUser(enteredUserNameRef, enteredPassword);
        setRegistered(true);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className="max-w-xl mx-auto my-7">
      {!registered ? (
        <>
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
          <form onSubmit={submitHandler}>
            <div>
              <label htmlFor="userName">User Name</label>
              <input type="text" id="userName" required ref={userNameRef} />
            </div>
            <div>
              <label htmlFor="password">Your Password</label>
              <input
                type="password"
                id="password"
                required
                ref={passwordInputRef}
              />
            </div>
            <div className="my-5">
              <button className="button button-color mr-4">
                {isLogin ? "Singin" : "Create Account"}
              </button>
              <button type="button" onClick={switchAuthModeHandler}>
                {isLogin ? "No Account? Create One" : "Already a user? Signin"}
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="">
          <p>You have successfully registered!</p>

          <button
            onClick={() => router.reload()}
            className="button button-color"
          >
            Sign In
          </button>
        </div>
      )}
    </section>
  );
}

export default AuthForm;
