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

        console.error("checkAuth error");

        return;
    }

    const { uid, photoURL } = user;
    const ref = db.collection("users").doc(uid);

    State.loggedIn = true;
    State.user = user;
    State.session = {
        uid,
        photoURL,
        pending : true
    };

    // create user entry in db
    ref.get().then(doc => {
        if (!doc.exists) {
            ref.set({
                created_at : serverTimestamp(),
                updated_at : serverTimestamp(),
                photoURL
            });

            return;
        }

        ref.update({
            updated_at : serverTimestamp(),
            photoURL
        });

        State.session.username = doc.data().username;
        delete State.session.pending;
    });

    m.redraw();
}

export { checkAuth as checkAuth };
