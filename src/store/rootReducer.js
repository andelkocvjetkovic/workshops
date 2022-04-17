import { combineReducers } from 'redux';
import workshopReducer from '@app/store/reducers/workshopSlice';
import cartReducer from '@app/store/reducers/cartSlice';

export default combineReducers({
  workshop: workshopReducer,
  cart: cartReducer,
});
