import { compose, createStore, applyMiddleware, Middleware } from 'redux';
import { rootReducer } from './root-reducer';

import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// Root store type
export type RootState = ReturnType<typeof rootReducer>;

// Configurate Saga
const sagaMiddleware = createSagaMiddleware();

// Configurate enhancers; use them only in development environment
const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composeEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancers(applyMiddleware(...middleWares));

// Configurate a persist store
type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store; first parameter is a requirement
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

// Tell sagaMiddleware to run
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
