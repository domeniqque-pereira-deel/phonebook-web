import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { Database } from '~/services/firebase';
import history from '~/services/history';
import {
  Types,
  addPersonSuccess,
  personFailure,
  fetchPersonsSuccess,
  fetchPersonsFailure,
  updatePersonSuccess,
} from './index';
import {
  PERSON_COLLECTION_PATH,
  PHONES_COLLECTION_PATH,
} from '~/store/collectionsPaths';

function* addPerson({ payload }) {
  try {
    const { name, sex, lifeStage, numbers } = payload;
    const numbersTrimmed = numbers.map((number) => number.replace(/\s/g, ''));
    const dataPerson = {
      name,
      sex,
      lifeStage,
      records: [],
      numbers: numbersTrimmed,
    };

    const PersonCollection = Database.collection(PERSON_COLLECTION_PATH);

    /** Create person */
    const { id } = yield call(
      [PersonCollection, PersonCollection.add],
      dataPerson
    );

    dataPerson.id = id;

    /** Create Numbers */
    const PhonesCollection = Database.collection(PHONES_COLLECTION_PATH);

    const numbersRequest = numbersTrimmed.map((number) => {
      const NumberRef = PhonesCollection.doc(number);

      return call([NumberRef, NumberRef.set], {
        active: true,
        value: number,
      });
    });

    yield all(numbersRequest);

    toast.success('Pessoa cadastrada com sucesso');
    yield put(addPersonSuccess(dataPerson));

    history.push('/person');
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
    const Collection = Database.collection(PERSON_COLLECTION_PATH);

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
    const { personId, record, date } = payload;
    const person = yield select((state) =>
      state.person.list.find((p) => p.id === personId)
    );

    const records = [...(person.records ?? []), { record, date }];

    const PersonRef = Database.collection(PERSON_COLLECTION_PATH).doc(personId);

    yield call([PersonRef, PersonRef.update], { records });

    yield put(updatePersonSuccess({ ...person, records }));

    // history.push(`/person/${personId}`);

    toast.success('Conversa adicionada');
  } catch (err) {
    console.error(err);
    toast.error('Não foi possível adicionar o comentário, tente novamente!');
    yield put(personFailure());
  }
}

export default all([
  takeLatest(Types.ADD_PERSON_REQUEST, addPerson),
  takeLatest(Types.FETCH_PERSONS_REQUEST, fetchPersons),
  takeLatest(Types.ADD_RECORD_REQUEST, addRecordToPerson),
]);
