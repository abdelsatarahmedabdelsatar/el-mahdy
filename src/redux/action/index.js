import axiosInstance from "../../axiosConfig/instance";

export const fetchDataSuccess = (data) => ({
  type: "FETCH_DATA_SUCCESS",
  payload: data,
});

export const fetchDataFromApi = () => {
  return (dispatch) => {
    localStorage.getItem("access-token")?
     axiosInstance
      .get("api/v1/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
      .then((res) => {
        const data = res.data.data.cartItems;
        console.log(res.data.data.cartItems);
        dispatch(fetchDataSuccess(data));
      })
      .catch((err) => {
        console.error("Error fetching cart product : ", err);
      }):dispatch(fetchDataSuccess([]));
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
