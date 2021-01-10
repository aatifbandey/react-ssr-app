import { createStore, applyMiddleware, compose } from 'redux';

import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { createReducer } from '../reducers';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'search',
  storage,
  whitelist: ['homeReducer']
};



export const configureStore = (initialState = {}, history) => {
  let composeEnhancers = compose;
  const reduxSagaMonitorOptions = {};
  /* eslint-disable */
  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

    /* eslint-enable */
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];
  const persistedReducer = persistReducer(persistConfig, createReducer())


  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(...enhancers),
  );
  const persistor = persistStore(store)
    
  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  /* eslint-disable */
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }
  /* eslint-enable */
  return {
    store,
    persistor
  }
}