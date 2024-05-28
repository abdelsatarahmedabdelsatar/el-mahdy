// const cart = [];
// const initialState = {
//   dataArray: [],
// };
const handleCart = (state = { cartItems: [] }, action) => {
  const product = action.payload;
  switch (action.type) {
    case "FETCH_DATA_SUCCESS":
      return action.payload;
    case "ADDITEM":
      // Check if product already in cart
      console.log(state);
      const exist = state.cartItems.find((x) => x._id === product._id);
      if (exist) {
        // Increase the quantity
        return {
          ...state,
          cartItems: [
            state.cartItems.map((x) =>
              x._id === product._id ? { ...x, quantity: x.quantity + 1 } : x
            ),
          ],
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...product, quantity: 1 }],
        };
      }
      break;
    case "DELITEM":
      const exist2 = state.find((x) => x._id === product._id);
      if (exist2.quantity === 1) {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            state.cartItems.filter((x) => x._id !== exist2._id),
          ],
        };
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            state.cartItems.map((x) =>
              x._id === product._id ? { ...x, quantity: x.quantity - 1 } : x
            ),
          ],
        };
      }
      break;

    case "DELALL":
      return product;

      break;

    default:
      return state;
      break;
  }
};

export default handleCart;
