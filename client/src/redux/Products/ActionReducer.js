import {ADD_PROD_NAME, ADD_PROD_ID} from "./ActionType";
const initialState = {
  item_name: [],
  item_ID: [],
};
const Products = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROD_NAME: {
      return {
        item_name: action.payload,
      };
    }
    case ADD_PROD_ID: {
      return {
        ...state,
        item_ID: [...state.item_ID, action.payload],
      };
    }
    default:
      return state;
  }
};
export default Products;
