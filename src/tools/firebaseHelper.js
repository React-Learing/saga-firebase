import firebase from 'firebase';


export default function read(path) {
  let result = {};
  return firebase.database().ref(`${path}`).once('value', (snapshot) => {
    result = snapshot.val() || {};
  }).then(() => result);
}
