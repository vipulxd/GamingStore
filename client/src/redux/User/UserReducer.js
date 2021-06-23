import {ADD_USER, USER_TYPE, RM_USER} from "./UserActionTypes";

const initialState = {
  user: null,
  authenticated: false,
  id: null,
  acctype: "regular_user",
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        user: action.payload.name,
        id: action.payload.id,
        authenticated: true,
      };
    case RM_USER:
      return {
        authenticated: false,
      };
    case USER_TYPE:
      return {
        ...state,
        acctype: "admin",
      };
    default:
      return state;
  }
};
export default UserReducer;
