import db, { firebase, serverTimestamp } from "../db";
// import checkAuth from "../db/checkAuth";
import Session from "./Session";

export default State => ({
    INIT() {
        State.session = new Session();

        firebase.auth().onAuthStateChanged(fbUser => State.session.onAuthStateChanged(fbUser));
    },

    AUTH_WITH_PROVIDER(provName, provType) {
        const provider = new firebase.auth[provName]();
        const local = firebase.auth.Auth.Persistence.LOCAL;

        const { session } = State;

        // ensure modal is open when logging in (could have clicked provider from song form area)
        State.modal = "login";
        State.session.tryingAuthProvider(provType);

        return firebase.auth().signInWithPopup(provider)
            // .then(res => session.signInWithPopup(res))
            .then(() => {
                firebase.auth().setPersistence(local);
            })
            .catch(err => session.signInWithPopupCatch(err));
    },

    LOGOUT() {
        State.session.tryingLogout();

        return firebase.auth().signOut()
            // onAuthStateChange will pick this up
            .catch(() => State.session.signOutCatch());
    },

    ADD_USERNAME(username) {
        return State.session.addUsername(username);
    }
});
