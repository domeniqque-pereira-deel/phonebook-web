import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default (reducers) => {
  const persistedReducers = persistReducer(
    {
      key: 'phonelist',
      storage,
      whitelist: ['person', 'phone', 'auth'],
    },
    reducers
  );

  return persistedReducers;
};
