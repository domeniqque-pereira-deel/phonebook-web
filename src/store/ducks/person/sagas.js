import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { Types, addPersonSuccess, personFailure } from './index';
import { Database } from '~/services/firebase';
import {
  PERSON_COLLECTION_PATH,
  PHONES_COLLECTION_PATH,
} from '~/store/collectionsPaths';
import history from '~/services/history';

function* addPerson({ payload }) {
  try {
    const { name, sex, lifeStage, numbers } = payload;
    const numbersTrimmed = numbers.map((number) => number.replace(/\s/g, ''));
    const dataPerson = { name, sex, lifeStage, numbers: numbersTrimmed };

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

    history.push('/persons');
  } catch (error) {
    toast.error(
      'Não foi possível realizar o cadastro, tente novamente mais tarde'
    );
    console.error(error);
    yield put(personFailure());
  }
}

export default all([takeLatest(Types.ADD_PERSON_REQUEST, addPerson)]);
