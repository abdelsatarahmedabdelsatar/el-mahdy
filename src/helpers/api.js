import axiosInstance from "../axiosConfig/instance";
import { toast } from 'sonner';
import { addCart } from "../redux/action";



export const addProduct = (product,dispatch) => {
  if(localStorage.getItem("access-token")){
  axiosInstance
      .post(
        "api/v1/cart",
        {
          productId: product._id,
          color: "",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      )
      .then(() => {
        toast.success("تم إضافة المنتج بنجاح");
      });
  }else{
    window.location.assign('/login');
  }
    dispatch(addCart(product));
  };