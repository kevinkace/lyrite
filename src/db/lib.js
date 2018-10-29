import db, { firebase, serverTimestamp } from "./";

/**
 * Does something with auth
 * @param {object} State - state object...?
 * @param {object} user - user data
 */
function checkAuth(State, user) {
    // not sure if/how this would ever happen
    if (!user) {
        State.loggedIn = false;
        delete State.user;
        delete State.session;
        delete State.modal;

        console.error("checkAuth error");

        return;
    }

    const { uid, photoURL } = user;
    const userRef = db.collection("users").doc(uid);

    State.loggedIn = true;
    State.user = user;
    State.userRef = userRef;
    State.session = {
        uid,
        photoURL,
        pending : true
    };

    // create user entry in db
    userRef.get().then(doc => {
        if (!doc.exists) {
            userRef.set({
                created_at : serverTimestamp(),
                updated_at : serverTimestamp(),
                photoURL
            });

            State.modal = "username";

            return;
        }

        userRef.update({
            updated_at : serverTimestamp(),
            photoURL
        });

        State.session.username = doc.data().username;
        delete State.session.pending;

        if (!State.session.username) {
            State.modal = "username";
        } else {
            delete State.modal;
        }

        m.redraw();
    });

    m.redraw();
}

export { checkAuth as checkAuth };
