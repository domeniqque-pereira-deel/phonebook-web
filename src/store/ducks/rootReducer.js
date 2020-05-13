import { combineReducers } from 'redux';

import auth from './auth';
import person from './person';

export default combineReducers({
  auth,
  person,
});
