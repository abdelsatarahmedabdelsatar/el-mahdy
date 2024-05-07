import React, { useState } from "react";
import axiosInstance from "../../axiosConfig/instance";
import Spinner from "../../components/Spinner";
import { Formik, Field, Form } from "formik";

const Login = ({ setSignIn }) => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (email, password) => {
    setLoader(true);
    axiosInstance
      .post("api/v1/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.data.role == "User") {
          localStorage.setItem("access-token", res.data.data.token);
          localStorage.setItem("identity", res.data.data._id);
          window.location.reload();
        //   setLoader(false);
        } else {
          setError("you must ba an user");
          setLoader(false);
        }
      })
      .catch(() => {
        setError("error in email or password");
        setLoader(false);
      });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        handleLogin(values.email, values.password);
      }}
    >
      <Form className="w-75 p-5">
        <div>
          <label htmlFor="email">عنوان البريد الإلكتروني</label>
          <Field
            name="email"
            type="email"
            className="form-control shadow-none"
            id="email"
            placeholder="ادخل البريد الإلكتروني"
          />
        </div>
        <div>
          <label htmlFor="password">كلمة المرور</label>
          <Field
            name="password"
            type="password"
            className="form-control shadow-none"
            id="password"
            placeholder="ادخل كلمة المرور"
          />
        </div>
        <div className="my-3">
          <p>
            جديد هنا؟{" "}
            <div
              onClick={() => setSignIn(false)}
              style={{ cursor: "pointer" }}
              className="text-decoration-underline text-primary"
            >
              سجل الان
            </div>{" "}
          </p>
        </div>
        {error && (
          <p className="text-danger d-flex justify-content-center">{error}</p>
        )}
        <button
          //   onClick={handleLogin}
          className="w-50 btn btn-dark"
          type="submit"
          disabled={loader}
        >
          {loader ? <Spinner /> : "تسجيل الدخول"}
        </button>
      </Form>
    </Formik>
  );
};

export default Login;
