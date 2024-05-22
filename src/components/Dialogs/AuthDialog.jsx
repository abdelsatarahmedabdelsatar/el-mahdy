import React, {useState}from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

const AuthDialog = ({ visible, onHide }) => {
    const [signIn, setSignIn] = useState(true);
  return (
    <div>
      <Dialog
        dir="rtl"
        style={{ width: "40%"}}
        visible={visible}
        onHide={onHide}
        header={signIn?"تسجيل الدخول" : "إلتحق بنا"}
      >
        <div className="login p-0 m-0">
        <div className="d-flex justify-content-center">
          {signIn ? (
            <Login onHide={onHide} setSignIn={setSignIn} />
          ) : (
            <Register onHide={onHide} setSignIn={setSignIn} />
          )}
        </div>
      </div>
      </Dialog>
    </div>
  );
};

export default AuthDialog;
