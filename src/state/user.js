import { firebase } from "../db";
import * as lib from "../db/lib";

export default (State) => ({
    "INIT" : () => {
        firebase.auth().onAuthStateChanged((user) => {
            console.log("Auth change");

            if(!user) {
                console.error("something broke");

                return;
            }

            for (const key in user) {
                if (!user.hasOwnProperty(key)) {
                    return;
                }

                console.log(key);
            }

            m.redraw();

            // console.log(user.displayName);
            // console.log(user.email);
            // console.log(user.emailVerified);
            console.log(user.photoURL);
            // console.log(user.isAnonymous);
            // console.log(user.uid);
            // console.log(user.providerData);
        });
    },

    "LOGIN" : (provName) => {
        const provider = new firebase.auth[provName]();

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                lib.checkAuth(State, result);
                delete State.modal;
            })
            .then(() =>
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            )
            .catch((err) => {
                delete State.loggedIn;
                debugger;
                console.log(err);
            });
    },

    "LOGOUT" : () => {
        firebase.auth().signOut()
            .then(function() {
                // Sign-out successful.
                delete State.loggedIn;
            })
            .catch(function(error) {
                // An error happened.
            });
    }
});
