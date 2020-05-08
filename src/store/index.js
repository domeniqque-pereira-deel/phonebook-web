import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import createStore from './createStore';
import persistReducer from './persistReducer';
import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

const store = createStore(persistReducer(rootReducer), middlewares);
const persisted = persistStore(store);

sagaMiddleware.run(rootSaga);

export default { store, persisted };
