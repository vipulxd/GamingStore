import {combineReducers} from "redux";
import UserReducer from "./User/UserReducer.js";
import CartReducer from "./Cart/CartReducer";
import Products from "./Products/ActionReducer";
import BuyInitiator from "./Purchase/purchaseReducer";
const rootReducer = combineReducers({
  UserInfo: UserReducer,
  CartInfo: CartReducer,
  ProdInfo: Products,
  BuyInfo: BuyInitiator,
});

export default rootReducer;
