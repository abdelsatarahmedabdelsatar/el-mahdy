import React, { useState } from "react";
import axiosInstance from "../../axiosConfig/instance";
import Spinner from "../../components/Spinner";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";

const Login = ({ setSignIn,onHide }) => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const navigator = useNavigate();
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
          navigator("/");
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
      <Form className="w-100 p-0 gx-0 row justify-content-end">
        <div>
          {/* <label htmlFor="email">عنوان البريد الإلكتروني</label> */}
          <Field
            name="email"
            type="email"
            className="form-control shadow-none"
            id="email"
            placeholder="ادخل البريد الإلكتروني"
          />
        </div>
        <div>
          {/* <label htmlFor="password">كلمة المرور</label> */}
          <Field
            name="password"
            type="password"
            className="form-control shadow-none my-3"
            id="password"
            placeholder="ادخل كلمة المرور"
          />
        </div>
        <div className="my-3">
          جديد هنا؟
          <div
            onClick={() => setSignIn(false)}
            style={{ cursor: "pointer" }}
            className="text-decoration-underline text-primary d-inline px-3"
          >
            سجل الان
          </div>
        </div>
        {error && (
          <p className="text-danger d-flex justify-content-center">{error}</p>
        )}
          <button
          //   onClick={handleLogin}
          className="w-25 btn"
          type="submit"
          onClick={onHide}
        >
          إلغاء
        </button>
        <button
          //   onClick={handleLogin}
          className="w-50 btn btn-warning"
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
