import produce from 'immer';

export const Types = {
  ADD_PERSON_REQUEST: '@person/ADD_PERSON_REQUEST',
  ADD_PERSON_SUCCESS: '@person/ADD_PERSON_SUCCESS',
  PERSON_FAILURE: '@person/PERSON_FAILURE',
};

export const INITIAL_STATE = {
  list: [],
  loading: false,
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
        break;
      }
      case Types.PERSON_FAILURE:
        draft.loading = false;
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
