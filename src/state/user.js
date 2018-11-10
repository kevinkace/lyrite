import db, { firebase, serverTimestamp } from "../db";
import * as lib from "../db/lib";

export default State => ({
    INIT() {
        firebase.auth().onAuthStateChanged(user => {
            if (!user || State.session.authorizing) {
                // not logged in, so why is this firing?

                return;
            }

            lib.checkAuth(State, user).then(() => {
                // todo: move to view
                m.redraw();
            });
        });
    },

    LOGIN(provName, provType) {
        const provider = new firebase.auth[provName]();
        const local = firebase.auth.Auth.Persistence.LOCAL;

        State.session.provider = provType;
        State.session.authorizing = true;
        delete State.session.authFailed;
        delete State.session.loggedIn;

        // ensure modal is open when logging in (could have clicked provider from song form area)
        State.modal = "login";
        m.redraw();

        return firebase.auth().signInWithPopup(provider)
            .then(result => {
                firebase.auth().setPersistence(local);

                return lib.checkAuth(State, result.user, provType);
            })
            .then(() => {
                // login step 3b/3c
                delete State.session.authorizing;
            })
            .catch(err => {
                // login step 3a
                State.session.authFailed = true;
                console.error(err);

                return err;
            });
    },

    LOGOUT() {
        State.session.loggingOut = true;

        return firebase.auth().signOut()
            .then(() => {
                // Sign-out successful
                State.session = {};
            })
            .catch(err => {
                // An error happened.
                // todo: handle error
                console.error(err);
            });
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
