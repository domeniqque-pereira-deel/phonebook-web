import produce from 'immer';

// Action Types
export const Types = {
  SIGN_UP_REQUEST: '@auth/SIGN_UP_REQUEST',
  SIGN_IN_REQUEST: '@auth/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: '@auth/SIGN_IN_SUCCESS',
  SIGN_FAILURE: '@auth/SIGN_FAILURE',
  SIGN_OUT: '@auth/SIGN_OUT',
};

// Reducers
const INITIAL_STATE = {
  signed: false,
  loading: false,
  user: {},
};

export default function reducer(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case Types.SIGN_IN_REQUEST:
        draft.loading = true;
        break;
      case Types.SIGN_IN_SUCCESS: {
        draft.user = action.payload.user;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case Types.SIGN_FAILURE: {
        draft.loading = false;
        break;
      }
      case Types.SIGN_OUT: {
        draft.user = null;
        draft.signed = false;
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

// Action Creators
export function signInRequest(email, password) {
  return {
    type: Types.SIGN_IN_REQUEST,
    payload: { email, password },
  };
}

export function signFailure() {
  return {
    type: Types.SIGN_FAILURE,
  };
}

export function signInSuccess(user) {
  return {
    type: Types.SIGN_IN_SUCCESS,
    payload: { user },
  };
}

export function signUpRequest({ email, password }) {
  return {
    type: Types.SIGN_UP_REQUEST,
    payload: { email, password },
  };
}

export function signOut() {
  return {
    type: Types.SIGN_OUT,
  };
}
