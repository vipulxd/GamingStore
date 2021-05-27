import {ADD_USER, USER_TYPE} from "./UserActionTypes";

export const addUser = (text = null) => {
  return {
    type: ADD_USER,
    payload: text,
  };
};

export const userType = () => {
  return {
    type: USER_TYPE,
  };
};
