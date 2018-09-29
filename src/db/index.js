import config from "../../config";
import firebase from "firebase";
import "firebase/firestore";

firebase.initializeApp(config);

const db = firebase.firestore();
const fsDelete = firebase.firestore.FieldValue.delete;
const fsTimestamp = firebase.firestore.FieldValue.serverTimestamp;

db.settings({ timestampsInSnapshots : true });

window.fb = firebase;

export default db;
export {
    firebase as firebase,
    fsDelete as fsDelete,
    fsTimestamp as fsTimestamp
};
