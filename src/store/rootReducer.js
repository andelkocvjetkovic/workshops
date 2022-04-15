import { combineReducers } from 'redux';
import workshopReducer from '@app/store/reducers/workshopSlice';

export default combineReducers({
  workshop: workshopReducer,
});
