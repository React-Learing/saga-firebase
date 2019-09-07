import firebase from 'firebase';
import config from '../config/config';

export default {
  init: () => {
    firebase.initializeApp(config);
  },
};
