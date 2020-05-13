import { all, takeLatest, call, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { toast } from 'react-toastify';

import { Types, signInSuccess, signFailure, signOut } from './index';
import { FirebaseAuth } from '~/services/firebase';
import history from '~/services/history';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const { user } = yield call(
      [FirebaseAuth, FirebaseAuth.signInWithEmailAndPassword],
      email,
      password
    );

    yield put(signInSuccess(user));

    history.push('/');
  } catch (error) {
    yield put(signFailure());

    const message =
      error.code === 'auth/too-many-requests'
        ? 'Você fez muitas tentativas. Tente novamente mais tarde!'
        : 'Falha no login, verifique seus dados!';

    console.error(error);
    toast.error(message);
  }
}

function* signUp({ payload }) {
  const { email, password } = payload;

  try {
    const { user } = yield call(
      [FirebaseAuth, FirebaseAuth.createUserWithEmailAndPassword],
      email,
      password
    );

    yield put(signInSuccess(user));

    history.push('/');
  } catch (error) {
    yield put(signFailure());

    let message = 'Falha no login, verifique seus dados!';

    if (error.code === 'auth/too-many-requests')
      message =
        'Você fez muitas tentativas. Verifique seus dados e tente novamente mais tarde!';

    if (error.code === 'auth/email-already-in-use')
      message = 'Este email já está vinculado a uma conta!';

    console.error(error);
    toast.error(message);
  }
}

const getAuthChannel = () => {
  return eventChannel((emit) => {
    return FirebaseAuth.onAuthStateChanged((user) => emit({ user }));
  });
};

function* watchForFirebaseAuth({ payload }) {
  if (!payload) return;

  const channel = yield call(getAuthChannel);
  const { user } = yield take(channel);

  if (user) {
    yield put(signInSuccess(user));
  } else if (payload.signed) {
    yield put(signOut());
  }

  channel.close();
}

export default all([
  takeLatest(Types.SIGN_IN_REQUEST, signIn),
  takeLatest(Types.SIGN_UP_REQUEST, signUp),
  takeLatest('persist/REHYDRATE', watchForFirebaseAuth),
]);
