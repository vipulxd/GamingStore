import {ADD_PROD, DEL_PROD} from "./CartActionType";

export const addprod = (prod = null) => {
  return {
    type: ADD_PROD,
    payload: prod,
  };
};
export const delprod = (delpro = null) => {
  return {
    type: DEL_PROD,
    payload: delpro,
  };
};
