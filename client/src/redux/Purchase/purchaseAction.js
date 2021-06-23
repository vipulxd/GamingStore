import {ENABLE_BUY, SUM_PAY} from "./purchaseActionType";

export const enable_buy = () => {
  return {
    type: "ENABLE_BUY",
  };
};
export const sum_add = (text = null) => {
  return {
    type: "SUM_PAY",
    payload: text,
  };
};
