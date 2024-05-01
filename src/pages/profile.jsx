import React, { useState, useEffect } from "react";
import Navbar from "./../components/Navbar";
import { Footer } from "../components";
import axiosInstance from "./../axiosConfig/instance";
import Spinner from "../components/Spinner";
import { Formik, Field, Form } from "formik";
import ImageUpload from "../components/ImageUpload";
import { toast } from "sonner";
const Profile = () => {
  const [profile, setProfile] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    fetchDataFromAPI().then((res) => {
      setProfile(res.data.data);
      console.log(res.data.data);
    });
  }, []);

  const fetchDataFromAPI = async () => {
    const data = await axiosInstance.get(
      "api/v1/users/" + localStorage.getItem("identity"),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }
    );

    return data;
  };

  const handleLogout = () => {
    localStorage.removeItem("access-token");
    window.location.reload();
  };

  const handleEditProfile = (obj) => {
    setLoader(true);
    axiosInstance
      .put(
        "api/v1/users/" + profile._id,
        {
          fullName: obj.fullName,
          userName: obj.username,
          email: obj.email,
          adress: obj.address,
          mobile: obj.mobile,
          profileImage: profileImage,
          role: "User",
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
        toast.success("تم تعديل الملف الشخصي بنجاح")
      })
      .catch((err) => {
        setLoader(false);
        toast.error("خطأ في بيانات بعض الحقول")
      });
  };

  return (
    <>
      <Navbar />
      <div
        className="row gx-0"
        style={{ height: "40px", backgroundColor: "#ffcc1b" }}
      ></div>
      {profile.fullName ? (
        <div className="row gx-0 bg-light">
          <div className="col-md-3 text-center my-3 pe-4">
            <div
              id="profile-card"
              className="card border-0"
              style={{ width: "18rem" }}
            >
              {/* <img
              className="card-img-top rounded-circle m-auto my-4"
              style={{ height: "120px", width: "120px" }}
              src="./profile_picture.jpg"
              alt="profile image"
            /> */}
              <ImageUpload
                setImage={setProfileImage}
                imagePath={profile?.profileImage}
              />
              <div className="card-body">
                <h5 className="card-title">{profile?.fullName}</h5>
              </div>
              {/* <ul dir="ltr" className="list-group list-group-flush">
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Vestibulum at eros</li>
              <li className="list-group-item">
                {" "}
                
              </li>
            </ul> */}
              <div className="btn mb-4" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i> logot
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <Formik
              initialValues={profile}
              onSubmit={(values) => {
                handleEditProfile(values);
              }}
            >
              <Form>
                <div className="row container mt-3">
                  <div className="form col-6 py-3">
                    <label htmlFor="fullName">الاسم الكامل</label>
                    <Field
                      type="text"
                      className="form-control"
                      name="fullName"
                      id="fullName"
                      placeholder="أدخل الاسم الكامل"
                    />
                  </div>
                  <div className="form  col-6 py-3">
                    <label htmlFor="userName">إسم المستخدم</label>
                    <Field
                      type="text"
                      className="form-control"
                      id="userName"
                      name="userName"
                      placeholder="أدجل إسم المستخدم"
                    />
                  </div>
                  <div className="form col-6 py-3">
                    <label htmlFor="email">عنوان البريد الإلكتروني</label>
                    <Field
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="أدجل البريد الإلكتروني"
                    />
                  </div>
                  <div className="form col-6 py-3">
                    <label htmlFor="mobile">رقم الجوال</label>
                    <Field
                      type="text"
                      className="form-control"
                      id="mobile"
                      name="mobile"
                      placeholder="أدجل رقم الجوال"
                    />
                  </div>
                  <div className="form py-3">
                    <label htmlFor="adress">العنوان</label>
                    <Field
                      type="text"
                      className="form-control"
                      id="adress"
                      name="adress"
                      placeholder="أدجل العنوان"
                    />
                  </div>
                  <div className="text-center">
                    <button
                      className="w-100 rounded-5 btn form-control my-4"
                      style={{ backgroundColor: "#ffcc1b" }}
                      type="submit"
                      disabled={loader}
                    >
                      {loader ? <Spinner /> : "تعديل"}
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      ) : (
        <div className="my-5">
          <Spinner />

        </div>
      )}

      <Footer />
    </>
  );
};

export default Profile;
