import { FirebaseError } from "firebase/app";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { auth, signIn } from "../config/firebase";

const SignUp = () => {
  const LoginWithCredentials = (email: string, password: string) => {
    signIn(email, password)
      .then(() => {
        router.push("/test");
      })
      .catch((error: FirebaseError) => {
        console.log(error);
        setError(error);
      });
  };

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<FirebaseError>();

  const fullUser = { email, password };

  return (
    <div className="h-screen flex flex-col justify-center text-blue-500 px-10">
      <div className="flex flex-col justify-evenly h-[50%] items-center">
        <h1 className="font-bold text-2xl">Log in</h1>
        <input
          type="email"
          placeholder="email"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="password"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="w-[30%] flex justify-end">
          <button
            className="btn btn-xs btn-primary"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </button>
        </div>

        <button
          className="btn"
          onClick={() => {
            password && email && LoginWithCredentials(email, password);
          }}
        >
          Log in
        </button>
      </div>
      <p>{error?.message}</p>
    </div>
  );
};

export default SignUp;
function signInAnonymous(email: string, password: string) {
  throw new Error("Function not implemented.");
}
