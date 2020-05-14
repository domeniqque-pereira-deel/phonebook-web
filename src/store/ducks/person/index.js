import produce from 'immer';

export const Types = {
  ADD_PERSON_REQUEST: '@person/ADD_PERSON_REQUEST',
  ADD_PERSON_SUCCESS: '@person/ADD_PERSON_SUCCESS',
  PERSON_FAILURE: '@person/PERSON_FAILURE',
  FETCH_PERSONS_REQUEST: '@person/FETCH_PERSONS_REQUEST',
  FETCH_PERSONS_SUCCESS: '@person/FETCH_PERSONS_SUCCESS',
  FETCH_PERSONS_FAILURE: '@person/FETCH_PERSONS_FAILURE',
  UPDATE_PERSON_REQUEST: '@person/UPDATE_PERSON_REQUEST',
  UPDATE_PERSON_SUCCESS: '@person/UPDATE_PERSON_SUCCESS',
};

export const INITIAL_STATE = {
  list: [],
  loading: false,
  hasError: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case Types.ADD_PERSON_REQUEST:
        draft.loading = true;
        break;
      case Types.ADD_PERSON_SUCCESS: {
        draft.list = [...state.list, action.payload.person];
        draft.loading = false;
        draft.hasError = false;
        break;
      }
      case Types.PERSON_FAILURE:
        draft.loading = false;
        break;
      case Types.FETCH_PERSONS_FAILURE:
        draft.loading = false;
        draft.hasError = true;
        break;
      case Types.FETCH_PERSONS_SUCCESS:
        draft.list = action.payload;
        draft.hasError = false;
        break;
      default:
        break;
    }
  });
}

export function addPersonRequest(payload) {
  return {
    type: Types.ADD_PERSON_REQUEST,
    payload,
  };
}

export function addPersonSuccess(person) {
  return {
    type: Types.ADD_PERSON_SUCCESS,
    payload: { person },
  };
}

export function personFailure() {
  return { type: Types.PERSON_FAILURE };
}

export function fetchPersonsRequest() {
  return { type: Types.FETCH_PERSONS_REQUEST };
}

export function fetchPersonsSuccess(payload) {
  return { type: Types.FETCH_PERSONS_SUCCESS, payload };
}

export function fetchPersonsFailure() {
  return { type: Types.FETCH_PERSONS_FAILURE };
}
