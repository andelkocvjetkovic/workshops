import { createStore, compose } from 'redux';
import { isProduction } from '@app/constants';
import rootReducer from '@app/store/rootReducer';

const composeEnhancers = isProduction ? compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers());
export default store;
