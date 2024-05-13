import React, { useState } from "react";
import Login from "../components/Auth/Login";
import Register from "./../components/Auth/Register";

const Auth = () => {
  const [signIn, setSignIn] = useState(true);

  return (
    <>
      <div className="row gx-0 login">
        <div className="col-md-6 d-flex justify-content-center">
          {signIn ? (
            <Login setSignIn={setSignIn} />
          ) : (
            <Register setSignIn={setSignIn} />
          )}
        </div>
        <div className="col-6 d-none d-md-flex justify-content-center p-5  border-end border-1 border-dark">
          <img src="./logo_2.png" width={400} alt="" />
        </div>
      </div>
    </>
  );
};

export default Auth;
