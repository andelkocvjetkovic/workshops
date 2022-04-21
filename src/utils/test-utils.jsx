import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import theme from '@app/styles/theme';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '@app/store/rootReducer';
import { Provider } from 'react-redux';
import rootSagas from '@app/store/rootSaga';
//eslint-disable-next-line no-unused-vars
import axios from 'axios';
import orgStore from '@app/store/store';

jest.mock('axios');
jest.mock('@app/store/store', () => jest.fn());
let store;
orgStore.mockImplementation(() => store);

export default function renderWithProvider(ui, initialState = {}, options) {
  const effectMiddleware = next => effect => {
    return next(effect);
  };
  const sagaMiddleware = createSagaMiddleware({ effectMiddlewares: [effectMiddleware] });
  store = createStore(rootReducer, initialState ? initialState : undefined, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSagas);

  const rendered = render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </Provider>,
    options
  );
  return {
    ...rendered,
    rerender: (ui, options) => renderWithProvider(ui, initialState, { container: rendered.container, ...options }),
  };
}
