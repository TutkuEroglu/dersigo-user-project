export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const EDIT_USER = "EDIT_USER";
export const LOGOUT = "LOGOUT";

export const loginSuccess = (payload: object) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const EditUser = (payload: object) => ({
  type: EDIT_USER,
  payload,
});

export const logout = () => ({
  type: LOGOUT,
});