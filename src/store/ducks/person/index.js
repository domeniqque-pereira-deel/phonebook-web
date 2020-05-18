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
  ADD_RECORD_REQUEST: '@person/ADD_RECORD_REQUEST',
};

export const INITIAL_STATE = {
  list: [],
  loading: false,
  hasError: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case Types.ADD_RECORD_REQUEST:
      case Types.ADD_PERSON_REQUEST:
      case Types.FETCH_PERSONS_REQUEST:
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
        draft.list = [];
        draft.loading = false;
        draft.hasError = true;
        break;
      case Types.FETCH_PERSONS_SUCCESS:
        draft.list = action.payload;
        draft.hasError = false;
        draft.loading = false;
        break;
      case Types.UPDATE_PERSON_SUCCESS: {
        const index = draft.list.findIndex((p) => p.id === action.payload.id);

        if (index >= 0) draft.list.splice(index, 0, action.payload);

        draft.loading = false;
        draft.hasError = false;
        break;
      }
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

export function updatePersonRequest(id, person) {
  return { type: Types.UPDATE_PERSON_REQUEST, payload: { id, person } };
}

export function updatePersonSuccess(person) {
  return { type: Types.UPDATE_PERSON_SUCCESS, payload: person };
}

export function addRecordRequest(personId, record, date) {
  return {
    type: Types.ADD_RECORD_REQUEST,
    payload: { personId, record, date },
  };
}
