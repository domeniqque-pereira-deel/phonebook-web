import { combineReducers } from 'redux';

import auth from './auth';
import person from './person';
import phone from './phone';

export default combineReducers({
  auth,
  person,
  phone,
});
