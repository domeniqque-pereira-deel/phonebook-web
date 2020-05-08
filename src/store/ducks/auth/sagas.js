import { all, takeLatest } from 'redux-saga/effects';
import { Types } from './index';

export function* signUp() {}

export default all([takeLatest(Types.LOGIN_REQUEST, signUp)]);
