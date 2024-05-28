import axiosInstance from "../axiosConfig/instance";
import { toast } from 'sonner';
import { addCart } from "../redux/action";

export const handleLoginNavigate = (navigate) => {
  navigate("/login");
};

export const handleAdd = (product, dispatch,setShowModal) => {
  if (localStorage.getItem("access-token")) {
    addProduct(product, dispatch);
  } else {
    setShowModal(true);
  }
}
export const handledelete = (id,setRefresh,autoRefresh) => {
  axiosInstance
  .delete("api/v1/cart/"+id, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
  })
  .then((res) => {
    toast.success("تم حذف المنتج بنجاح");
    setRefresh(!autoRefresh)
  })
  .catch((err) => {
    console.error("Error fetching cart product : ", err);
  })
}

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