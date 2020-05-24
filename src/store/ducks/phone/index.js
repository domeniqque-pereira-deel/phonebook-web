import { produce } from 'immer';

export const Types = {
  ADD_PHONE_LIST_REQUEST: '@phones/ADD_PHONE_LIST_REQUEST',
  ADD_PHONE_LIST_SUCCESS: '@phones/ADD_PHONE_LIST_SUCCESS',
  FETCH_PHONE_LIST_REQUEST: '@phones/FETCH_PHONE_LIST_REQUEST',
  FETCH_PHONE_LIST_SUCCESS: '@phones/FETCH_PHONE_LIST_SUCCESS',
  ADD_CALL_PHONE_REQUEST: '@phones/ADD_CALL_PHONE_REQUEST',
  UPDATE_PHONE_SUCCESS: '@phones/UPDATE_PHONE_SUCCESS',
  PHONE_FAILURE: '@phones/PHONE_FAILURE',
};

export const INITIAL_STATE = {
  list: [],
  loading: false,
  hasError: false,
};

export const CallStatus = {
  RECEIVED: '@call/RECEIVED',
  MISSED: '@call/MISSED',
  DONT_EXIST: '@call/DONT_EXIST',
};

export default function reducer(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case Types.ADD_PHONE_LIST_REQUEST:
      case Types.FETCH_PHONE_LIST_REQUEST:
      case Types.ADD_CALL_PHONE_REQUEST:
        draft.loading = true;
        break;
      case Types.FETCH_PHONE_LIST_SUCCESS:
        draft.list = action.payload;
        draft.loading = false;
        break;
      case Types.ADD_PHONE_LIST_SUCCESS:
        draft.loading = false;
        break;
      case Types.UPDATE_PHONE_SUCCESS: {
        const { phone } = action.payload;
        const phoneIndex = draft.list.findIndex((p) => p.id === phone.id);
        draft.list.splice(phoneIndex, 1, phone);
        draft.loading = false;
        break;
      }
      case Types.PHONE_FAILURE:
        draft.hasError = true;
        draft.loading = false;
        break;
      default:
        break;
    }
  });
}

export function addPhonesRequest(sequence) {
  return {
    type: Types.ADD_PHONE_LIST_REQUEST,
    payload: { sequence },
  };
}

export function addPhonesSuccess() {
  return {
    type: Types.ADD_PHONE_LIST_SUCCESS,
  };
}

export function fetchPhoneListRequest() {
  return {
    type: Types.FETCH_PHONE_LIST_REQUEST,
  };
}

export function fetchPhoneListSuccess(phones) {
  return {
    type: Types.FETCH_PHONE_LIST_SUCCESS,
    payload: phones,
  };
}

export function addCallPhoneRequest(phone, callStatus) {
  return {
    type: Types.ADD_CALL_PHONE_REQUEST,
    payload: { phone, callStatus },
  };
}

export function updatePhoneSuccess(phone) {
  return {
    type: Types.UPDATE_PHONE_SUCCESS,
    payload: { phone },
  };
}

export function phonesFailure() {
  return { type: Types.PHONE_FAILURE };
}
