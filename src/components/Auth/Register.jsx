import React, { useState } from "react";
import axiosInstance from "../../axiosConfig/instance";
import Spinner from "../../components/Spinner";
import { Formik, Field, Form } from "formik";

const Register = ({ setSignIn, onHide }) => {
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
      <Form className="row justify-content-end p-2">
        <>
          <div className="form col-md-6">
            {/* <label htmlFor="fullName">الاسم الكامل</label> */}
            <Field
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              placeholder="أدخل أسمك"
            />
          </div>
          <div className="form col-md-6">
            {/* <label htmlFor="userName">إسم المستخدم</label> */}
            <Field
              type="text"
              className="form-control"
              id="userName"
              name="userName"
              placeholder="أدخل أسمك"
            />
          </div>

          <div className="form  col-md-6 mt-2">
            {/* <label htmlFor="email">عنوان البريد الإلكتروني</label> */}
            <Field
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="name@example.com"
            />
          </div>
          <div className="form   col-md-6 mt-2">
            {/* <label htmlFor="phone">رقم الجوال</label> */}
            <Field
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="ادخل رقم الجوال"
            />
          </div>
          <div className="form col-md-12 my-2">
            {/* <label htmlFor="address">العنوان</label> */}
            <Field
              type="text"
              className="form-control"
              name="address"
              id="address"
              placeholder="أدخل العنوان"
            />
          </div>
          <div className="form col-md-6">
            {/* <label htmlFor="pass">كلمة المرور</label> */}
            <Field
              type="password"
              name="pass"
              className="form-control"
              id="pass"
              placeholder="كلمة المرور"

            />
          </div>
          <div className="form col-md-6">
            {/* <label htmlFor="confirmPass">تأكيد كلمة المرور</label> */}
            <Field
              type="password"
              className="form-control"
              name="confirmPass"
              id="confirmPass"
              placeholder="تأكيد كلمة المرور"
            />
          </div>
          <div className="mt-3 me-4">
            <p>
              هل لديك حساب بالفعل؟{" "}
              <div
                onClick={() => setSignIn(true)}
                style={{ cursor: "pointer" }}
                className="text-decoration-underline text-primary  d-inline px-3"
              >
                تسجيل الدخول
              </div>{" "}
            </p>
          </div>
          <button
            //   onClick={handleLogin}
            className="w-25 btn "
            type="submit"
            onClick={onHide}
          >
            إلغاء
          </button>
          <button
            disabled={loader}
            className="col-11 btn btn-dark w-25 f-left"
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
