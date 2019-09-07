export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
export const READ_API = 'READ_API';
export const READ_SUCCES = 'READ_SUCCES';
export const READ_REQUEST = 'READ_REQUEST';
export const READ_FIREBASE = 'READ_FIREBASE';

export function readAPI() {
  return {
    type: READ_API,
  };
}

export function readSucces(data) {
  return {
    type: READ_SUCCES,
    payload: data,
  };
}

export function readRequest() {
  return {
    type: READ_REQUEST,
  };
}

export function readFirebase() {
  return {
    type: READ_FIREBASE,
  };
}
