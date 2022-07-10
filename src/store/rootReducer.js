import { combineReducers } from 'redux';
import cartReducer from '@app/store/reducers/cartSlice';

export default combineReducers({
  cart: cartReducer,
});
