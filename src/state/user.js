import { firebase } from "../db";
import * as lib from "../db/lib";

export default State => ({
    INIT : () => {
        firebase.auth().onAuthStateChanged(user => {
            console.log("Auth change");

            if (!user) {
                // not logged in, so why is this firing?

                return;
            }

            lib.checkAuth(State, null, user);

            // console.log(user.providerData);
            // console.log(user.displayName);
            // console.log(user.email);
            // console.log(user.emailVerified);
            // console.log(user.photoURL);
            // console.log(user.isAnonymous);
            // console.log(user.uid);
            // console.log(user.providerData);
            // user.updateProfile({
            //     displayName : "test"
            // });
        });
    },

    LOGIN : provName => {
        const provider = new firebase.auth[provName]();

        firebase.auth().signInWithPopup(provider)
            .then(result => {
                lib.checkAuth(State, result);
                delete State.modal;

                return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            })
            .catch(err => {
                delete State.loggedIn;

                debugger;

                console.log(err);
            });
    },

    LOGOUT : () => {
        firebase.auth().signOut()
            .then(() => {
                // Sign-out successful.
                delete State.loggedIn;
            })
            .catch(err => {
                // An error happened.
                console.error(err);
            })
            .finally(() => {
                m.redraw();
            });
    }
});
