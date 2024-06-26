import axiosInstance from "../../axiosConfig/instance";

export const fetchDataSuccess = (data) => ({
  type: "FETCH_DATA_SUCCESS",
  payload: data,
});

export const fetchDataFromApi = () => {
  return (dispatch) => {
    if (localStorage.getItem("access-token")) {
      axiosInstance
        .get("api/v1/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then((res) => {
          const data = res.data.data;
          console.log(res.data.data.cartItems);
          dispatch(fetchDataSuccess(data));
        })
        .catch((err) => {
          if (err.response.data.message.includes("please login again")) {
            localStorage.removeItem("access-token");
            window.location.reload();
          }
          // console.error("Error fetching cart product : ", err);
        });
    } else {
      dispatch(fetchDataSuccess({
        cartItems:[]
      }));
    }
  };
};

export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};

export const delCart = (product) => {
  return {
    type: "DELITEM",
    payload: product,
  };
};

export const delAllCart = () => {
  return {
    type: "DELALL",
    payload: [],
  };
};
