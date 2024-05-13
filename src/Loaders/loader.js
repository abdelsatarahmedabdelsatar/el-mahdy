import axiosInstance from "../axiosConfig/instance";

export const ProductDetailsLoder = async (arg) => {
  axiosInstance
    .get("api/v1/product/" + arg.params.id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then((res) => {
      return res.data.data
    })
};
