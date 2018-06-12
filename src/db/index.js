import config from "../../config";
import firebase from "firebase";
import "firebase/firestore";

firebase.initializeApp(config);

const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });

export default db;
