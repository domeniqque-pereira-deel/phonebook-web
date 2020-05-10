import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { Types, signInSuccess, signFailure } from './index';
import { Firebase } from '~/services/firebase';
import history from '~/services/history';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const auth = Firebase.auth();

    const { user } = yield call(
      [auth, auth.signInWithEmailAndPassword],
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
    const auth = Firebase.auth();

    const { user } = yield call(
      [auth, auth.createUserWithEmailAndPassword],
      email,
      password
    );

    yield put(signInSuccess(user));

    history.push('/');
  } catch (error) {
    yield put(signFailure());

    let message = 'Falha no login, verifique seus dados!';

    if (error.code === 'auth/too-many-requests')
      message = 'Você fez muitas tentativas. Tente novamente mais tarde!';

    if (error.code === 'auth/email-already-in-use')
      message = 'Este email já está vinculado a uma conta!';

    console.error(error);
    toast.error(message);
  }
}

export default all([
  takeLatest(Types.SIGN_IN_REQUEST, signIn),
  takeLatest(Types.SIGN_UP_REQUEST, signUp),
]);
