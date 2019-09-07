export const READ_FIREBASE_SUCCES = 'READ_FIREBASE_SUCCES';
export const READ_FIREBASE_FAIL = 'READ_FIREBASE_FAIL';
export const READ_FIREBASE_REQUEST = 'READ_FIREBASE_REQUEST';
export const READ_FIREBASE = 'READ_FIREBASE';


export function readFirebaseSucces(data) {
  return {
    type: READ_FIREBASE_SUCCES,
    payload: data,
  };
}

export function readFirebaseRequest() {
  return {
    type: READ_FIREBASE_REQUEST,
  };
}

export function readFirebase(path) {
  return {
    type: READ_FIREBASE,
    path,
  };
}

export function readFirebasefail() {
  return {
    type: READ_FIREBASE_FAIL,
  };
}
