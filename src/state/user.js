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
            .then(() => State.session.signOut())
            .catch(() => State.session.signOutCatch());
    },

    ADD_USERNAME(username) {
        const usernameRef = db.collection("usernames").doc(username);

        State.session.tryingName = username;

        State.session.usernaming = true;
        delete State.session.usernameFailed;

        return db.runTransaction(tx =>
            tx.get(usernameRef).then(usernameDoc => {
                if (usernameDoc.exists) {
                    throw new Error("unique");
                }

                // update user with username
                tx.update(State.session.userRef, {
                    username,
                    updated : serverTimestamp()
                });

                // create username with user ref
                tx.set(usernameRef, {
                    user     : State.session.userRef,
                    provider : State.session.provider,
                    owner    : State.session.userRef,
                    created  : serverTimestamp()
                });
            })
        )
        .then(() => {
            delete State.session.tryingName;
            delete State.session.usernaming;
            State.session.username = username;
            State.session.loggedIn = true;
        })
        .catch(err => {
            delete State.session.usernaming;
            State.session.usernameFailed = err.message;

            throw err;
        });
    }
});
