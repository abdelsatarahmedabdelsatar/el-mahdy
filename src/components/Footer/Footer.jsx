import React from "react";

const Footer = () => {
  return (
    <>
      <footer
        className="row gx-0 pb-5"
        style={{ backgroundColor: "#666", color: "#FFF" }}
      >
        <div className="row gx-0 justify-content-around">
          <div className="col-md-5 p-3">
            <h6 className="my-4">متجر المهدي للاعلان</h6>
            <p>
              من قلب القصيم، انطلقنا كوكالة دعاية وإعلان صغيرة عام 2020 برؤية
              "إبداع بلا حدود". و سعينا لتغيير مشهد الإعلان في المملكة بطرق
              مبتكرة. اليوم، نفخر بفريقنا المكون من أكثر من 50 مبدعًا يضيفون
              لمسات فريدة لكل مشروع. نمونا يعكس التزامنا بالإبداع والتفوق. في
              المهدي، نقدم حلولا إعلانية متكاملة تلبي احتياجات عملائنا وتحقق
              أهدافهم نصنع الفرق ونرسم المستقبل بإبداع لا يعرف الحدود.
            </p>
          </div>

          {/* ====================================================================== */}

          <div className="col-md-3 p-3">
            <h6 className="my-4">روابط مهمة</h6>
            <div className="row text-white">
              <div className="col-5">
                <a
                  href="#"
                  className="d-block my-1 text-decoration-none text-white"
                >
                  فروعنا
                </a>
                <a
                  href="#"
                  className="d-block my-1 text-decoration-none text-white"
                >
                  معرض أعمالنا
                </a>
              </div>
              <div className="col-7">
                <a
                  href="#"
                  className="d-block my-1 text-decoration-none text-white"
                >
                  سياسة الاستخدام
                </a>
                <a
                  href="#"
                  className="d-block my-1 text-decoration-none text-white"
                >
                  سياسة الخصوصية
                </a>
                <a
                  href="#"
                  className="d-block my-1 text-decoration-none text-white"
                >
                  سياسة الاسترجاع والاستبدال
                </a>
              </div>
            </div>
          </div>

          {/* ====================================================================== */}

          <div className="col-md-3 text-center d-flex justify-content-center align-items-center p-3">
            <div className="d-block">
              <div dir="ltr">+966-056 54 54 013</div>
              <div className="my-2">
                {" "}
                <a href="">
                  <i className="footer-icon-mail fa-regular fa-envelope"></i>
                </a>{" "}
                <a href="">
                  <i className="footer-icon-mail fa-brands fa-whatsapp"></i>
                </a>
                <a href="">
                  <i className="footer-icon-mail fa-regular fa-paper-plane"></i>
                </a>
                <a href="">
                  <i
                    style={{ transform: "rotate(320deg)" }}
                    className="footer-icon-mail fa-solid fa-phone-volume"
                  ></i>
                </a>
              </div>

              <p>جميع الحقوق محفوظة لدي وكالة المهدي للدعاية واللإعلان</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
