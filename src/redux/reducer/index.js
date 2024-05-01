import { combineReducers } from "redux";
import handleCart from './handleCart'
import profileReducer from './handleProfileData';
const rootReducers = combineReducers({
    handleCart,profileReducer
})
export default rootReducers