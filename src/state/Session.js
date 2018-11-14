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

    deleteAll(keep) {
        debugger;

        for (const prop in this) {
            if (keep.indexOf(prop) >= 0) {
                continue;
            }

            delete this[prop];
        }
    }

    tryingAuthProvider(provType) {
        debugger;

        this.provider = provType;
        this.authorizing = true;
        this.loggingIn = true;

        delete this.init;
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

    addFbUser(fbUser) {
        debugger;

        const { uid, photoURL } = fbUser;
        const userRef = db.collection("users").doc(uid);

        Object.assign(this, {
            fbUser,
            userRef,
            uid,
            photoURL
        });
    }

    onAuthStateChanged(fbUser) { // eslint-disable-line max-statements
        debugger;

        // app startup, never logged in
        if (!fbUser) {
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

        this.addFbUser(fbUser);

        this.getUser();
    }

    /**
     * Get user from Firestore, or create new
     */
    getUser() {
        debugger;

        return this.userRef.get()
            .then(this.gotDoc.bind(this))
            .then(() => {
                if (this.getUsername()) {
                    this.loggedIn = true;
                } else {
                    // todo: this feels strange
                    State.modal = "login";
                }
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
            });
    }

    gotDoc(doc) {
        debugger;

        const { photoURL } = this;

        this.doc = doc;

        return doc.exists ?
            this.userRef.update({
                updated : serverTimestamp(),
                photoURL
            }) :
            this.userRef.set({
                created : serverTimestamp(),
                updated : serverTimestamp(),
                photoURL
            });
    }

    getUsername() {
        debugger;

        if (!this.doc || !this.doc.data) {
            return;
        }

        this.username = this.doc.data().username;
    }

    signInWithPopupCatch(err) {
        debugger;

        console.error(err);

        this.deleteAll();

        this.authFailed = true;
    }
}
