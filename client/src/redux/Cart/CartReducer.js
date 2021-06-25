import {ADD_PROD, DEL_PROD} from "./CartActionType";

const initialState = {
  products: [],
};
const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROD:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case DEL_PROD:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default CartReducer;
