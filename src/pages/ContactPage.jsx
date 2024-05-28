import React from "react";
import { Footer, Navbar } from "../components";
const ContactPage = () => {
  return (
    <>
   
      <div className="container">
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div className="form my-3">
                <label for="Name">اسم</label>
                <input
                  type="email"
                  className="form-control"
                  id="Name"
                  placeholder="أدخل اسمك"
                />
              </div>
              <div className="form my-3">
                <label for="Email">الميل</label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  placeholder="name@example.com"
                />
              </div>
              <div className="form  my-3">
                <label for="Password">الرسالة</label>
                <textarea
                  rows={5}
                  className="form-control"
                  id="Password"
                  placeholder="أدخل رسالتك"
                />
              </div>
              <div className="text-center">
                <button
                  className="my-2 px-4 mx-auto btn btn-dark"
                  type="submit"
                >
                  إرسال
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
