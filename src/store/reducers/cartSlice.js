import { ACTION_CART_ADD, ACTION_CART_DELETE, ACTION_CART_RESET, ACTION_CART_UPDATE_QUANTITY } from '@app/store/storeActions';

/**
 *
 * @type {{products: Workshop~OrderProduct[]}}
 */
const initialState = {
  products: [],
};
export default function cartReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_CART_ADD: {
      return {
        ...state,
        products: state.products
          .concat(payload)
          .reduce(
            (acc, x) =>
              acc.some(y => y.id === x.id)
                ? acc.map(y => (y.id === x.id ? { ...x, quantity: y.quantity + x.quantity } : y))
                : acc.concat(x),
            []
          ),
      };
    }
    case ACTION_CART_UPDATE_QUANTITY: {
      return {
        ...state,
        products: state.products.map(x => (x.id === payload.id ? { ...x, quantity: payload.quantity } : x)),
      };
    }
    case ACTION_CART_DELETE: {
      return {
        ...state,
        products: state.products.filter(x => x.id !== payload),
      };
    }
    case ACTION_CART_RESET: {
      return initialState;
    }
    default:
      return state;
  }
}

export const selectCartSubtotal = state => state.cart.products.reduce((acc, x) => acc + x.quantity * x.price, 0).toFixed(2);
export const selectIsCartEmpty = state => state.cart.products.length === 0;
export const selectCartAmount = state => state.cart.products.reduce((acc, x) => acc + x.quantity, 0);
