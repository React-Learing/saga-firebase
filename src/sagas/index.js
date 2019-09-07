import { takeEvery } from 'redux-saga/effects';
import readAPI from './readAPI';
import readFirebase from './ReadFirebase';


export default function* rootSaga() {
  yield takeEvery('READ_API', readAPI);
  yield takeEvery('READ_FIREBASE', readFirebase);
}
