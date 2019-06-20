import config from "../../config";
import firebase from "firebase/app";
import "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp(config);

const db = firebase.firestore();
const { delete : _delete, serverTimestamp, arrayUnion, arrayRemove } = firebase.firestore.FieldValue;

// requires a param
db.settings({});

window.fb = firebase;

export default db;
export {
    firebase as firebase,
    _delete as _delete,
    serverTimestamp as serverTimestamp,
    arrayUnion as arrayUnion,
    arrayRemove as arrayRemove
};
