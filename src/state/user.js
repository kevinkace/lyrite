import { firebase } from "../db";
import * as lib from "../db/lib";

export default (State) => ({
    "INIT" : () => {
        if(!lib.checkAuth(State)) {
            setTimeout(() => {
                console.log("timeout login");
                lib.checkAuth(State);
            }, 1500);
        }
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
