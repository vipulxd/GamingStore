import {combineReducers} from "redux";
import UserReducer from "./User/UserReducer.js";

const rootReducer = combineReducers({
  UserInfo: UserReducer,
});

export default rootReducer;
