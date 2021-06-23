import {ENABLE_BUY, SUM_PAY} from "./purchaseActionType";

const initialState = {
  enable_buy: false,
  previous_sum: null,
};

const BuyInitiator = (state = initialState, action) => {
  switch (action.type) {
    case ENABLE_BUY: {
      return {
        ...state,
        enable_buy: true,
      };
    }
    case SUM_PAY: {
      return {
        ...state,
        previous_sum: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default BuyInitiator;
