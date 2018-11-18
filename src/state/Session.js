import db, { firebase, serverTimestamp } from "../db";
import State from ".";

export default class Session {
    constructor() {
        this.init = true;
        // loggingIn,
        // loggingOut,
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

    deleteAll(keep = []) {
        for (const prop in this) {
            if (keep.indexOf(prop) >= 0) {
                continue;
            }

            delete this[prop];
        }
    }

    tryingAuthProvider(provType) {
        this.provider = provType;
        this.authorizing = true;
        this.loggingIn = true;

        delete this.init;
    }

    onAuthStateChanged(authData) {
        // app startup, never logged in
        if (!authData) {
            this.deleteAll([ "init" ]);

            if (!this.init) {
                // logged out?
                // auth failed?
                // perms revoked?
            }

            return;
        }

        this.deleteAll([ "provider", "loggingIn" ]);

        this.loggingIn = true;
        this.authorized = true;
        this.addAuthData(authData);

        this.usernaming = true;
        this.getUser();

        m.redraw();
    }

    addAuthData(authData) {
        const { uid, photoURL } = authData;

        Object.assign(this, {
            authData,
            uid,
            photoURL
        });
    }

    /**
     * Get user from Firestore, or create new
     */
    getUser() {
        const { uid, photoURL } = this;
        const userRef = db.collection("users").doc(uid);

        return userRef.get()
            .then(doc => {
                if (!doc.exists) {
                    return userRef.set({
                        created : serverTimestamp(),
                        updated : serverTimestamp(),
                        photoURL
                    })
                    .then(() => {
                        State.modal = "login";
                        delete this.usernaming;

                        m.redraw();
                    });
                }

                return userRef.update({
                    updated : serverTimestamp(),
                    photoURL
                })
                .then(() => {
                    const username = doc.data().username;

                    if (username) {
                        // fucking done!
                        delete this.usernaming;
                        delete this.loggingIn;
                        this.loggedIn = true;
                        this.username = username;

                        return m.redraw();
                    }

                    // else wait for username modal submit
                    State.modal = "login";
                    delete this.usernaming;
                });
            })
            .catch(err => {
                debugger;
                console.error(err);

                this.authFailed = true;

                delete this.authorized;
                delete this.authorizing;
                delete this.username;
                delete this.usernaming;
                delete this.usernameFailed;
                delete this.tryingName;
                delete this.provider;
                delete this.loggedIn;

                // todo: is this necessary?
                firebase.auth().signOut();

                throw err;
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

        debugger;

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
            m.redraw();
        })
        .catch(err => {
            delete this.usernaming;
            this.usernameFailed = err.message;

            throw err;
        });
    }

    tryingLogout() {
        // delete this.authorizing;
        // delete this.authFailed;
        // delete this.username;
        // delete this.usernaming;
        // delete this.usernameFailed;
        // delete this.tryingName;
        // delete this.provider;
        // delete this.loggedIn;
        // this.deleteAll([ "authorized" ]);
        this.loggingOut = true;
    }

    signOut() {
        delete this.provider;
        delete this.authorized;
        delete this.authorizing;
        delete this.username;
        delete this.user;
        delete this.tryingName;
        delete this.loggedIn;
    }

    signOutCatch(err) {
        debugger;

        // maybe still logged in?

        this.signOut;
    }

    signInWithPopupCatch(err) {
        debugger;

        console.error(err);

        this.deleteAll();

        this.authFailed = true;
    }
}
