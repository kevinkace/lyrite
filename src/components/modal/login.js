import m from "mithril";

import state from "../../state";

import { firebase } from "../../db";


export default {
    view() {
        return m("button", {
            onclick : () => {
                const provider = new firebase.auth.TwitterAuthProvider();

                firebase.auth().signInWithPopup(provider)
                    .then((result) => {
                        const token = result.credential.accessToken;
                        const secret = result.credential.secret;
                        const user = result.user;
                        debugger;
                    })
                    .catch((err) => {
                        debugger;
                        console.log(err);
                    });
            }
        }, "twitter");
    }
};
