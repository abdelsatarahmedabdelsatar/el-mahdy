import React, { useState } from "react";
import axiosInstance from "../../axiosConfig/instance";
import Spinner from "../../components/Spinner";
import { Formik, Field, Form } from "formik";

const Register = ({ setSignIn }) => {
  const [loader, setLoader] = useState(false);

  const handleRegister = (obj) => {
    setLoader(true);
    axiosInstance
      .post(
        "api/v1/auth/register",
        {
          fullName: obj.fullName,
          userName: obj.userName,
          email: obj.email,
          adress: obj.address,
          mobile: obj.phone,
          profileImage: null,
          role: "User",
          password: obj.pass,
          passwordConfirm: obj.confirmPass,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setLoader(false);
        console.log(res);
        setSignIn(true);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  return (
    <Formik
      initialValues={{
        fullName: "",
        userName: "",
        email: "",
        phone: "",
        address: "",
        pass: "",
        confirmPass: "",
      }}
      onSubmit={(values) => {
        handleRegister(values);
      }}
    >
      <Form className="px-5 mt-2 gx-0 row justify-content-around">
        <>
          <div className="form col-md-5">
            <label htmlFor="fullName">الاسم الكامل</label>
            <Field
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              placeholder="أدخل أسمك"
            />
          </div>
          <div className="form col-md-5">
            <label htmlFor="userName">إسم المستخدم</label>
            <Field
              type="text"
              className="form-control"
              id="userName"
              name="userName"
              placeholder="أدخل أسمك"
            />
          </div>

          <div className="form  col-md-5">
            <label htmlFor="email">عنوان البريد الإلكتروني</label>
            <Field
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="name@example.com"
            />
          </div>
          <div className="form   col-md-5">
            <label htmlFor="phone">رقم الجوال</label>
            <Field
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="ادخل رقم الجوال"
            />
          </div>
          <div className="form col-md-11">
            <label htmlFor="address">العنوان</label>
            <Field
              type="text"
              className="form-control"
              name="address"
              id="address"
              placeholder="أدخل العنوان"
            />
          </div>
          <div className="form col-md-5">
            <label htmlFor="pass">كلمة المرور</label>
            <Field
              type="password"
              name="pass"
              className="form-control"
              id="pass"
            />
          </div>
          <div className="form col-md-5">
            <label htmlFor="confirmPass">تأكيد كلمة المرور</label>
            <Field
              type="password"
              className="form-control"
              name="confirmPass"
              id="confirmPass"
            />
          </div>
          <div className="mt-3 me-4">
            <p>
              هل لديك حساب بالفعل؟{" "}
              <div
                onClick={() => setSignIn(true)}
                style={{ cursor: "pointer" }}
                className="text-decoration-underline text-primary"
              >
                تسجيل الدخول
              </div>{" "}
            </p>
          </div>
          <button
            disabled={loader}
            className="col-11 btn btn-dark "
            type="submit"
          >
            {loader ? <Spinner /> : "سجل"}
          </button>
        </>
      </Form>
    </Formik>
  );
};

export default Register;
