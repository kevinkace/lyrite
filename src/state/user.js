import m from "mithril";

import db from "../db";
import { firebase } from "../db";

export default (State) => ({
    "LOGIN" : (provName) => {
        const provider = new firebase.auth[provName]();

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const token = result.credential.accessToken;
                const secret = result.credential.secret;
                const user = result.user;

                State.loggedIn = true;
                delete State.modal;
                m.redraw();
                debugger;
            })
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
