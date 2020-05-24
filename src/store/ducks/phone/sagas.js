import { all, takeLatest, select, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  Types,
  phonesFailure,
  fetchPhoneListSuccess,
  addPhonesSuccess,
  fetchPhoneListRequest,
  updatePhoneSuccess,
} from './index';
import { Database } from '~/services/firebase';
import { PHONES_COLLECTION_PATH } from '~/store/collectionsPaths';
import history from '~/services/history';

function* addPhoneList({ payload }) {
  try {
    const ownerUid = yield select((state) => state.auth.user.uid);
    const Batch = Database.batch();

    const PhonesCollection = Database.collection(PHONES_COLLECTION_PATH);

    payload.sequence.forEach((number) => {
      const NumberRef = PhonesCollection.doc(
        `${number.replace(/\s/g, '')}-${ownerUid}`
      );

      Batch.set(NumberRef, {
        value: number,
        status: null,
        active: true,
        ownerUid,
      });
    });

    yield call([Batch, Batch.commit]);

    yield put(fetchPhoneListRequest());
    yield put(addPhonesSuccess());

    history.push('/phones');

    toast.success('Sequência adicionada com sucesso');
  } catch (error) {
    toast.error(
      'Não foi possível realizar o cadastro, tente novamente mais tarde'
    );

    console.error(error);

    yield put(phonesFailure());
  }
}

function* fetchPhoneList() {
  try {
    const ownerUid = yield select((state) => state.auth.user.uid);

    const Collection = Database.collection(PHONES_COLLECTION_PATH)
      .where('ownerUid', '==', ownerUid)
      .orderBy('value');

    const querySnapshot = yield call([Collection, Collection.get]);
    const phones = [];

    querySnapshot.forEach((doc) => {
      phones.push({ id: doc.id, ...doc.data() });
    });

    yield put(fetchPhoneListSuccess(phones));
  } catch (error) {
    console.error(error);

    yield put(phonesFailure());
  }
}

function* addCallPhone({ payload }) {
  try {
    const { phone, callStatus: status } = payload;

    const PhoneRef = Database.collection(PHONES_COLLECTION_PATH).doc(phone.id);

    yield call([PhoneRef, PhoneRef.update], { status });

    toast.success('Número status adicionado!');

    yield put(updatePhoneSuccess({ ...phone, status }));
  } catch (error) {
    toast.error('Não foi possível editar o número');

    console.error(error);

    yield put(phonesFailure());
  }
}

export default all([
  takeLatest(Types.ADD_PHONE_LIST_REQUEST, addPhoneList),
  takeLatest(Types.FETCH_PHONE_LIST_REQUEST, fetchPhoneList),
  takeLatest(Types.ADD_CALL_PHONE_REQUEST, addCallPhone),
]);
