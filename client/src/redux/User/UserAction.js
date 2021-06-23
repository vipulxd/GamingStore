import {ADD_USER, USER_TYPE, RM_USER} from "./UserActionTypes";

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
export const removeUser = () => {
  return {
    type: RM_USER,
  };
};
