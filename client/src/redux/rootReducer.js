import {combineReducers} from "redux";
import UserReducer from "./User/UserReducer.js";
import CartReducer from "./Cart/CartReducer";

const rootReducer = combineReducers({
  UserInfo: UserReducer,
  CartInfo: CartReducer,
});

export default rootReducer;
