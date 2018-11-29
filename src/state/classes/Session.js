import db, { firebase, serverTimestamp } from "../../db";
import State from "../";

export default class Session {
    constructor() {
        this.init = true;
        // loggingIn - over the whole login process, user or cached session
        // loggingOut - from user initiation,
        // loggedIn,
        // authorized,
        // authorizing,
        // authFailed,
        // username,
        // usernaming,
        // usernameFailed,
        // tryingName,
        // provider
    }

    deleteAll(keep = [], newValues) {
        for (const prop in this) {
            if (keep.indexOf(prop) >= 0) {
                continue;
            }

            delete this[prop];
        }

        if (!newValues) {
            return;
        }

        for (const prop in newValues) {
            this[prop] = newValues[prop];
        }
    }

    tryingAuthProvider(provType) {
        this.provider = provType;
        this.authorizing = true;
        this.loggingIn = true;

        delete this.init;
    }

    onAuthStateChanged(authData) {
        // console.info(`authed: ${authData ? "true" : "false"}`);

        // app startup, never logged in || no cached auth
        if (!authData) {
            this.deleteAll([ "init" ]);

            if (!this.init) {
                console.log("!init");
                // logged out?
                // auth failed?
                // perms revoked?
            }

            return;
        }

        // add auth data to state.session
        this.deleteAll([ "provider" ], {
            loggingIn  : true,
            authorized : true,
            usernaming : true,

            authData, // todo: is this necessary?
            uid      : authData.uid,
            photoURL : authData.photoURL
        });

        m.redraw();

        // get user...
        return this.getUser();
    }

    /**
     * Get user from Firestore, or create new
     * If new, or existing without a username - show login modal
     */
    getUser() {
        const { uid, photoURL } = this;
        const userRef = db.collection("users").doc(uid);

        return userRef.get()
            .then(doc => {
                // no user in FS, create user and ensure username modal
                if (!doc.exists) {
                    return userRef.set({
                        created : serverTimestamp(),
                        updated : serverTimestamp(),
                        photoURL
                    })
                    .then(() => {
                        State.modal = "login";
                        delete this.usernaming;
                    });
                }

                // user exists
                return userRef.update({
                    updated : serverTimestamp(),
                    photoURL
                })
                .then(() => {
                    const username = doc.data().username;

                    // if there's a username, done!
                    if (username) {
                        delete this.usernaming;
                        delete this.loggingIn;
                        this.loggedIn = true;
                        this.username = username;

                        return;
                    }

                    // else username modal
                    State.modal = "login";
                    delete this.usernaming;
                });
            })
            .catch(err => {
                debugger;
                console.error(err);

                this.deleteAll([], { authFailed : true });

                // todo: is this necessary?
                firebase.auth().signOut();

                // throw err;
            })
            .finally(() => m.redraw());
    }

    addUsername(username) {
        const { uid } = this;
        const usernameRef = db.collection("usernames").doc(username);
        const userRef     = db.collection("users").doc(uid);

        this.tryingName = username;
        this.usernaming = true;
        delete this.usernameFailed;

        return db.runTransaction(tx =>
            tx.get(usernameRef).then(usernameDoc => {
                if (usernameDoc.exists) {
                    throw new Error("unique");
                }

                // update user with username
                tx.update(userRef, {
                    username,
                    updated : serverTimestamp()
                });

                // create username with user ref
                tx.set(usernameRef, {
                    user    : userRef,
                    created : serverTimestamp(),
                    updated : serverTimestamp()
                });
            })
        )
        .then(() => {
            delete this.tryingName;
            delete this.usernaming;
            delete this.loggingIn;
            this.username = username;
            this.loggedIn = true;
        })
        .catch(err => {
            delete this.usernaming;
            this.usernameFailed = err.message;

            throw err;
        });
    }

    tryingLogout() {
        this.loggingOut = true;
    }

    signedOut() {
        this.deleteAll([], {
            init : true
        });
    }

    signOutCatch(err) {
        debugger;
        // maybe still logged in?
        // return this.signOut();
    }

    signInWithPopupCatch(err) {
        this.deleteAll([], {
            authFailed : true,
            init       : true
        });
    }
}
