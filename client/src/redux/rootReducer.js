import {combineReducers} from "redux";
import UserReducer from "./User/UserReducer.js";
import CartReducer from "./Cart/CartReducer";
import Products from "./Products/ActionReducer";
const rootReducer = combineReducers({
  UserInfo: UserReducer,
  CartInfo: CartReducer,
  ProdInfo: Products,
});

export default rootReducer;
