import {ADD_PROD_NAME, ADD_PROD_ID} from "./ActionType";

export const add_prod_name = item_name => {
  return {
    type: ADD_PROD_NAME,
    payload: item_name,
  };
};
export const add_prod_id = item_ID => {
  return {
    type: ADD_PROD_ID,
    payload: item_ID,
  };
};
