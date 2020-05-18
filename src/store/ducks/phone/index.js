import { produce } from 'immer';

export const Types = {
  ADD_PHONE_LIST_REQUEST: '@phones/ADD_PHONE_LIST_REQUEST',
  ADD_PHONE_LIST_SUCCESS: '@phones/ADD_PHONE_LIST_SUCCESS',
  PHONE_FAILURE: '@phones/PHONE_FAILURE',
};

export const INITIAL_STATE = {
  list: [],
  loading: false,
  hasError: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case Types.ADD_PHONE_LIST_REQUEST:
        draft.loading = true;
        break;
      case Types.ADD_PHONE_LIST_SUCCESS:
        draft.list = [...draft.list, action.payload];
        draft.loading = false;
        break;
      case Types.PHONE_FAILURE:
        draft.hasError = true;
        draft.loading = false;
        break;
      default:
        break;
    }
  });
}

export function addPhonesRequest(startSequence, endSequence) {
  return {
    type: Types.ADD_PHONE_LIST_REQUEST,
    payload: { startSequence, endSequence },
  };
}

export function addPhonesSuccess(phones) {
  return {
    type: Types.ADD_PHONE_LIST_SUCCESS,
    payload: phones,
  };
}

export function phonesFailure() {
  return { type: Types.PHONE_FAILURE };
}
