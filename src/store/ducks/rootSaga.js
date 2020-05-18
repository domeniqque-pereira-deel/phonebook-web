import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import person from './person/sagas';
import phone from './phone/sagas';

export default function* rootSaga() {
  return yield all([auth, person, phone]);
}
