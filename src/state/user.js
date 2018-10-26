import db, { firebase } from "../db";
import * as lib from "../db/lib";

export default State => ({
    INIT() {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                // not logged in, so why is this firing?

                return;
            }

            lib.checkAuth(State, user);
        });
    },

    LOGIN(provName) {
        const provider = new firebase.auth[provName]();

        firebase.auth().signInWithPopup(provider)
            .then(result => {
                lib.checkAuth(State, result.user);

                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            })
            .catch(err => {
                delete State.loggedIn;

                // todo: handle login error

                console.log(err);
            });
    },

    LOGOUT() {
        firebase.auth().signOut()
            .then(() => {
                // Sign-out successful.
                delete State.loggedIn;
            })
            .catch(err => {
                // An error happened.
                // todo: handle error
                console.error(err);
            })
            .finally(() => {
                m.redraw();
            });
    },

    TRY_ADD_USERNAME(username) {
        const usernameRef = db.collection("usernames").doc(username);

        return db.runTransaction(transaction =>
            transaction.get(usernameRef).then(usernameDoc => {
                if (usernameDoc.exists) {
                    throw new Error("username is taken");
                }

                transaction.update(State.userRef, { username });
                transaction.set(usernameRef, { user : State.userRef });
            })
        )
        .then(() => {
            console.log("username added");
        })
        .catch(err => {
            console.error(err);
        });
    }
});
