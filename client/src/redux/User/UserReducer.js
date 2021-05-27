import {ADD_USER, USER_TYPE} from "./UserActionTypes";

const user_logged = localStorage.getItem("_email");
if (user_logged === "vipul.xtr@gmail.com") {
  var acc_type = "Admin";
} else {
  acc_type = "_regular_user";
}
const initialState = {
  user: user_logged,
  acctype: acc_type,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        user: action.payload,
      };
    case USER_TYPE:
      return {
        ...state,
        acctype: action.payload,
      };
    default:
      return state;
  }
};
export default UserReducer;
