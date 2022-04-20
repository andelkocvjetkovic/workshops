import { combineReducers } from 'redux';
import workshopReducer from '@app/store/reducers/workshopListSlice';
import cartReducer from '@app/store/reducers/cartSlice';

export default combineReducers({
  workshopList: workshopReducer,
  cart: cartReducer,
});
