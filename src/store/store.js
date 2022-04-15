import { applyMiddleware, createStore, compose } from 'redux';
import { isProduction } from '@app/constants';
import createSagaMiddleware from 'redux-saga';
import rootSagas from '@app/store/rootSaga';
import rootReducer from '@app/store/rootReducer';

const composeEnhancers = isProduction ? compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware({});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSagas);
export default store;
