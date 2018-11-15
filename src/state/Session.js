import db, { firebase, serverTimestamp } from "../db";
import State from ".";

export default class Session {
    constructor() {
        this.init = true;
        // loggingIn
        // authorized,
        // authorizing,
        // authFailed,
        // username,
        // usernaming,
        // usernameFailed,
        // tryingName,
        // provider,
        // loggedIn
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
        debugger;

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

        this.authorized = true;
        this.addAuthData(authData);

        this.usernaming = true;
        this.getUser();
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
        debugger;
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
                        delete this.usernaming;

                        m.redraw();
                    });
                }

                return userRef.update({
                    updated : serverTimestamp(),
                    photoURL
                })
                .then(() => {
                    if (doc.data().username) {
                        // fucking done!
                        m.redraw();

                        return;
                    }

                    debugger;

                    State.modal = "login";
                    delete this.usernaming;
                });
            })
            .catch(err => {
                console.error(err);
                debugger;

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
        debugger;

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
                    user    : this.userRef,
                    created : serverTimestamp(),
                    updated : serverTimestamp()
                });
            })
        )
        .then(() => {
            delete this.tryingName;
            delete this.usernaming;
            this.username = username;
            this.loggedIn = true;
            m.redraw();
        })
        .catch(err => {
            debugger;
            delete this.usernaming;
            this.usernameFailed = err.message;

            throw err;
        });
    }

    tryingLogout() {
        debugger;

        delete this.authorizing;
        delete this.authFailed;
        delete this.username;
        delete this.usernaming;
        delete this.usernameFailed;
        delete this.tryingName;
        delete this.provider;
        delete this.loggedIn;
    }

    signOut() {
        debugger;

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
