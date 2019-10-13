import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { addSnackbar } from './snackbar/sanckbar.action';
import { generateSnackbar } from '../utils/generateSnackbar';
import { SnackbarTypes } from '../interfaces/snackbar';

const sagaMiddleware = createSagaMiddleware({
  onError: e => {
    store.dispatch(
      addSnackbar(generateSnackbar(e.message, SnackbarTypes.error)),
    );
  },
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export default store;
