import { all, takeLatest } from 'redux-saga/effects';

import { Types } from './index';

/** Create Numbers */
// const PhonesCollection = Database.collection(PHONES_COLLECTION_PATH);

// const numbersRequest = numbersTrimmed.map((number) => {
//   const NumberRef = PhonesCollection.doc(`${number}-${ownerUid}`);

//   return call([NumberRef, NumberRef.set], {
//     active: true,
//     value: number,
//     ownerUid,
//   });
// });

// yield all(numbersRequest);

function* addPhoneList({ payload }) {
  console.log(payload);
}

export default all([takeLatest(Types.ADD_PHONE_LIST_REQUEST, addPhoneList)]);
