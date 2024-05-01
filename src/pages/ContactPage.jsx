import React from "react";
import { Footer, Navbar } from "../components";
const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div class="form my-3">
                <label for="Name">اسم</label>
                <input
                  type="email"
                  class="form-control"
                  id="Name"
                  placeholder="أدخل اسمك"
                />
              </div>
              <div class="form my-3">
                <label for="Email">الميل</label>
                <input
                  type="email"
                  class="form-control"
                  id="Email"
                  placeholder="name@example.com"
                />
              </div>
              <div class="form  my-3">
                <label for="Password">الرسالة</label>
                <textarea
                  rows={5}
                  class="form-control"
                  id="Password"
                  placeholder="أدخل رسالتك"
                />
              </div>
              <div className="text-center">
                <button
                  class="my-2 px-4 mx-auto btn btn-dark"
                  type="submit"
                >
                  إرسال
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
