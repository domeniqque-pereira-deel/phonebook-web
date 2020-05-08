// Action Types
export const Types = {
  LOGIN_REQUEST: '@auth/SIGN_IN_REQUEST',
};

// Reducers
const INITIAL_STATE = {
  isLogged: false,
  token: null,
  user: {},
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}

// Action Creators
export function login(username, password) {
  return {
    type: Types.LOGIN_REQUEST,
    payload: { username, password },
  };
}
