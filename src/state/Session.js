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

    deleteAll() {
        debugger;

        delete this.provider;
        delete this.authorized;
        delete this.authorizing;
        delete this.authFailed;

        delete this.username;
        delete this.user;
        delete this.usernameFailed;
        delete this.tryingName;

        delete this.loggedIn;
        delete this.loggingIn;
    }

    tryingAuthProvider(provType) {
        this.provider = provType;
        this.authorizing = true;
        this.loggingIn = true;

        delete this.init;
    }

    tryingLogout() {
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
        delete this.provider;
        delete this.authorized;
        delete this.authorizing;
        delete this.username;
        delete this.user;
        delete this.tryingName;
        delete this.loggedIn;
    }

    signOutCatch(err) {
        // maybe still logged in?

        this.signOut;
    }

    addFbUser(fbUser) {
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
        // app startup, never logged in
        if (!fbUser && this.init) {
            return;
        }

        // not app startup, authed (something else should be handling this)
        if (!this.init && fbUser) {
            return;
        }

        // something else is running (logout), which will handle this
        if (this.authorizing || this.loggingOut || this.loggingIn) {
            return;
        }

        // handle auth removal (ie user removes auth from their provider)
        if (!fbUser && !this.loggingOut && !this.authorizing) {
            this.deleteAll();
            this.authFailed = true;

            return;
        }

        this.authorized = true;

        delete this.init;
        delete this.authorizing;
        delete this.authFailed;
        delete this.username;
        delete this.usernaming; // ?
        delete this.usernameFailed;
        delete this.tryingName;

        this.addFbUser(fbUser);

        this.getUser();
    }

    /**
     * Get user from Firestore, or create new
     */
    getUser() {
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
        if (!this.doc || !this.doc.data) {
            return;
        }

        this.username = this.doc.data().username;
    }

    signInWithPopup({ user : fbUser }) {
        this.authorized = true;

        delete this.authorizing;

        this.addFbUser(fbUser);

        return this.getUser();
    }

    signInWithPopupCatch(err) {
        console.error(err);

        this.deleteAll();

        this.authFailed = true;
    }
}
