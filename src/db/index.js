import config from "../../config";
import firebase from "firebase";
import "firebase/firestore";

firebase.initializeApp(config);

const db = firebase.firestore();
const fsDelete = firebase.firestore.FieldValue.delete;

db.settings({ timestampsInSnapshots : true });

export default db;
export {
    firebase as firebase,
    fsDelete as fsDelete
};
