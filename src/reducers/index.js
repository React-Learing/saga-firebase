import { combineReducers } from 'redux';
import read from './read';
import firebase from './firebase';

const rootReducer = combineReducers({
  read,
  firebase,
});

export default rootReducer;
