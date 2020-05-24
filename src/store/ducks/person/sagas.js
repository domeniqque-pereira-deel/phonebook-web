import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { Database } from '~/services/firebase';
import history from '~/services/history';
import { PERSON_COLLECTION_PATH } from '~/store/collectionsPaths';
import {
  Types,
  addPersonSuccess,
  personFailure,
  fetchPersonsSuccess,
  fetchPersonsFailure,
  fetchPersonsRequest,
} from './index';

function* addPerson({ payload }) {
  try {
    const numbers = payload.numbers.map((number) => number.replace(/\s/g, ''));
    const ownerUid = yield select((state) => state.auth.user.uid);

    const dataPerson = { ...payload, numbers, ownerUid, records: [] };

    const PersonCollection = Database.collection(PERSON_COLLECTION_PATH);

    /** Create person */
    const { id } = yield call(
      [PersonCollection, PersonCollection.add],
      dataPerson
    );

    dataPerson.id = id;

    toast.success('Pessoa cadastrada com sucesso');
    yield put(addPersonSuccess(dataPerson));

    history.push(`/persons/${dataPerson.id}`);
  } catch (error) {
    toast.error(
      'Não foi possível realizar o cadastro, tente novamente mais tarde'
    );

    console.error(error);

    yield put(personFailure());
  }
}

function* fetchPersons() {
  try {
    const ownerUid = yield select((state) => state.auth.user.uid);

    const Collection = Database.collection(PERSON_COLLECTION_PATH)
      .where('ownerUid', '==', ownerUid)
      .orderBy('name');

    const querySnapshot = yield call([Collection, Collection.get]);
    const persons = [];

    querySnapshot.forEach((doc) => {
      persons.push({ id: doc.id, ...doc.data() });
    });

    yield put(fetchPersonsSuccess(persons));
  } catch (error) {
    console.error(error);

    yield put(fetchPersonsFailure());
  }
}

function* addRecordToPerson({ payload }) {
  try {
    const { personId, record } = payload;

    const person = yield select((state) =>
      state.person.list.find((p) => p.id === personId)
    );

    const date = payload.date.getTime();

    const records = [...person.records, { record, date }];

    const PersonRef = Database.collection(PERSON_COLLECTION_PATH).doc(personId);

    yield call([PersonRef, PersonRef.update], { records });

    yield put(fetchPersonsRequest());
  } catch (err) {
    console.error(err);
    toast.error('Não foi possível adicionar o comentário, tente novamente!');
    yield put(personFailure());
  }
}

function* updatePerson({ payload }) {
  try {
    const { id, person } = payload;

    delete person.id;
    if (!person.records) person.records = [];

    const PersonRef = Database.collection(PERSON_COLLECTION_PATH).doc(id);

    yield call([PersonRef, PersonRef.update], person);

    yield put(fetchPersonsRequest());

    toast.success('Editado com sucesso!');

    history.push(`/persons/${id}`);
  } catch (err) {
    console.error(err);
    toast.error('Não foi possível editar, tente novamente!');
    yield put(personFailure());
  }
}

export default all([
  takeLatest(Types.ADD_PERSON_REQUEST, addPerson),
  takeLatest(Types.FETCH_PERSONS_REQUEST, fetchPersons),
  takeLatest(Types.ADD_RECORD_REQUEST, addRecordToPerson),
  takeLatest(Types.UPDATE_PERSON_REQUEST, updatePerson),
]);
