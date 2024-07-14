import axiosInstance from "../axiosConfig/instance";
import { toast } from "sonner";
import { addCart } from "../redux/action";
import { useState } from "react";

let typingTimer;
// const isObject = (val) => {
//   return val !== null && typeof val === "object" && !Array.isArray(val);
// };

export const handleLoginNavigate = (navigate) => {
  navigate("/login");
};

export const addProduct = (product_id,options, dispatch,eve) => {
  if (localStorage.getItem("access-token")) {
    axiosInstance
      .post(
        "api/v1/cart",
        {
          productId: product_id,
          options: options,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      )
      .then(() => {
        toast.success("تم إضافة المنتج بنجاح");
        eve.target.disabled = false;
      }).catch(()=>{
        toast.error("حدث خطأ");
        eve.target.disabled = false;
      });
  } else {
    window.location.assign("/login");
  }
  dispatch(addCart(product_id));
};

export const handleAdd = (product_id,options, dispatch, setShowModal,eve) => {
  if (localStorage.getItem("access-token")) {
    addProduct(product_id,options, dispatch,eve);
  } else {
    setShowModal(true);
  }
};
export const handledelete = (id, setRefresh, autoRefresh) => {
  axiosInstance
    .delete("api/v1/cart/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then((res) => {
      toast.success("تم حذف المنتج بنجاح");
      setRefresh(!autoRefresh);
    })
    .catch((err) => {
      console.error("Error fetching cart product : ", err);
    });
};

export const product_obj = (product) => {
  const listOfOptions = product.options.map((x) => ({
    id: x._id,
    value: "",
  }));
  product.options.forEach((x) => {
    if (x.relatedId) {
      listOfOptions.push({ id: x.relatedId._id, value: "" });
    }
  });

  // setNewValues(listOfOptions);

  return listOfOptions;
};

export const ChooseType = (o, options, option_id) => {
  var [valueChanged, setValueChanged] = useState("");
  return (
    <>
      <div>
        {getType(o, options, valueChanged, setValueChanged, option_id)}
      </div>
    </>
  );
};
const handleChangeOption = (
  option_main_id,
  eve,
  _id,
  options,
  setValueChanged,
) => {
 
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      setValueChanged(eve.target.value);

      axiosInstance
        .put(
          "api/v1/cart/updateOptions/" + _id,
          {
            options: options.map((opt) => {
              // console.warn(eve.target.value);
              return option_main_id == opt.id
                ? { ...opt, value: eve.target.value }
                : opt;
            }),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        )
        .then((res) => {
          toast.success("تم تعديل المنتج بنجاح");
        });
    }, 1100);

};
const getType = (
  obj,
  options,
  valueChanged,
  setValueChanged,
  option_id
) => {
  if (obj.type === "Input") {
    return (
      <>
        <div key={obj._id} className="row mt-4 align-items-center mx-0">
          <div className="col-6">
            {obj.ArName}
            {obj.moreMoney ? (
              <span className="text-danger me-4" style={{ fontSize: "14px" }}>
                +{obj.moreMoney} ر.س
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="col-6 pe-0">
            <input
              defaultValue={options?.find((o) => o.id == obj._id).value}
              onChange={(event) =>
                handleChangeOption(
                  obj._id,
                  event,
                  option_id,
                  options,
                  setValueChanged,
                )
              }
              type="text"
              placeholder={`أدخل ${obj.ArName}`}
              className="form-control"
            />
          </div>
        </div>
        {obj.relatedId &&
          // valueChanged == options.find((o) => o.id == obj._id).value ||
          valueChanged == obj.relatedValue &&
          getType(obj.relatedId, options, option_id, valueChanged, setValueChanged)}
      </>
    );
  } else if (obj.type === "TextArea") {
    return (
      <>
        <div key={obj._id} className="row mt-4 align-items-center mx-0">
          <div className="col-6">{obj.ArName}</div>
          <div className="col-6 pe-0">
            <textarea
              defaultValue={options.find((o) => o.id == obj._id).value}
              onChange={(event) =>
                handleChangeOption(
                  obj._id,
                  event,
                  option_id,
                  options,
                  setValueChanged,
                )
              }
              placeholder={`أدخل ${obj.ArName}`}
              className="form-control"
            />
          </div>
        </div>
        {((obj.relatedId &&
          valueChanged == options.find((o) => o.id == obj._id).value) ||
          valueChanged == obj.relatedValue) &&
          getType(obj.relatedId, options, option_id, valueChanged, setValueChanged)}
      </>
    )
  } else if (obj.type === "File") {
    return (
      <>
        <div key={obj._id} className="row mt-4 align-items-center mx-0">
          <div className="col-6">{obj.ArName}</div>
          <div className="col-6 pe-0">
            <input
              id={obj._id}
              defaultValue={options.find((o) => o.id == obj._id).value}
              onChange={(event) =>
                handleChangeOption(
                  obj._id,
                  event,
                  option_id,
                  options,
                  setValueChanged,
                )
              }
              placeholder={`أدخل ${obj.ArName}`}
              className="form-control"
              type="file"
            />
            {/* <ImageUpload /> */}
          </div>
        </div>
        {obj.relatedId &&
          // valueChanged == options.find((o) => o.id == obj._id).value ||
          valueChanged == obj.relatedValue &&
          getType(obj.relatedId, options, option_id, valueChanged, setValueChanged)}
      </>
    );
  } else if (obj.type === "DropDown") {
    return (
      <>
        <div key={obj._id} className="row mt-4 align-items-center mx-0">
          <div className="col-6">{obj.ArName}</div>
          <div className="col-6 pe-0">
            {/* <input
              id={obj._id}
              placeholder={`أدخل ${obj.ArName}`}
              className="form-control"
              type="checkbox"
            /> */}
            <select
              defaultValue={options.find((o) => o.id == obj._id).value}
              onChange={(event) =>
                handleChangeOption(
                  obj._id,
                  event,
                  option_id,
                  options,
                  setValueChanged,
                )
              }
              className="form-control"
              name=""
              id=""
            >
              <option value={""}>اختر</option>
              {obj.supplayData.map((d, i) => {
                return (
                  <option key={i} value={d}>
                    {d}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        {obj.relatedId &&
          // valueChanged == options.find((o) => o.id == obj._id).value ||
          valueChanged == obj.relatedValue &&
          getType(obj.relatedId, options, option_id, valueChanged, setValueChanged)}
      </>
    );
  } else {
    return (
      <>
        <div key={obj._id} className="row mt-4 align-items-center mx-0">
          <div className="col-6">{obj.ArName}</div>
          <div className="col-6 pe-0">
            <input
              type="text"
              placeholder={`${obj.ArName} أدخل`}
              className="form-control"
            />
          </div>
        </div>
        {obj.relatedId &&
          // valueChanged == options.find((o) => o.id == obj._id).value ||
          valueChanged == obj.relatedValue &&
          getType(obj.relatedId, options, option_id, valueChanged, setValueChanged)}
      </>
    );
  }
};
