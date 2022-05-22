import { ACTION_CART_APPEND, ACTION_CART_DELETE, ACTION_CART_RESET, ACTION_CART_UPDATE_QUANTITY } from '@app/store/storeActions';
import daggy from 'daggy';

const Cart = daggy.taggedSum('Cart', { Empty: [], Filled: ['products'] });

export default function cartReducer(state = Cart.Empty, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_CART_APPEND:
      return state.cata({
        Empty: () => Cart.Filled([payload]),
        Filled: products =>
          Cart.Filled(
            products
              .concat(payload)
              .reduce(
                (acc, x) =>
                  acc.some(y => y.id === x.id)
                    ? acc.map(y => (y.id === x.id ? { ...x, quantity: y.quantity + x.quantity } : y))
                    : acc.concat(x),
                []
              )
          ),
      });
    case ACTION_CART_UPDATE_QUANTITY:
      return Cart.Filled(state.products.map(x => (x.id === payload.id ? { ...x, quantity: payload.quantity } : x)));
    case ACTION_CART_DELETE:
      return Cart.Filled(state.products.filter(x => x.id !== payload));
    case ACTION_CART_RESET:
      return Cart.Empty;
    default:
      return state;
  }
}

export const selectCart = state => state.cart;
