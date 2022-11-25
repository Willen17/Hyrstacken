import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { signUp } from "../config/firebase";

const SignUp = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const fullUser = { name, email, password };

  const signUpUser = (email: string, password: string) => {
    signUp(email, password)
      .then(() => {
        router.push("/test");
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  };
  return (
    <div className="h-screen flex justify-center items-center text-8xl text-blue-500 px-10">
      <div>
        <div className="flex">
          <input
            type="text"
            placeholder="name"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
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
          <button
            className="btn"
            onClick={() => {
              email && password && signUpUser(email, password);
            }}
          >
            Button
          </button>
        </div>
        <Link href="/login">log in</Link>
      </div>
    </div>
  );
};

export default SignUp;
