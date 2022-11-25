import { useEffect } from "react";
import { auth, logOut } from "../config/firebase";

const Test = () => {
  useEffect(() => {
    console.log("auth ", auth);
  }, []);

  return (
    <div className="h-screen flex justify-center items-center text-8xl text-blue-500 px-10">
      <div>
        <p className="font-nunito font-extralight">
          Låna verktyg istället för att köpa nytt
        </p>
        <p>{auth.currentUser?.email}</p>

        <button className="btn btn-active" onClick={() => logOut()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Test;
