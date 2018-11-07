import db, { firebase, serverTimestamp } from "./";

/**
 * Does something with auth
 * @param {object} State - state object...?
 * @param {object} user - user data
 */
function checkAuth(State, user, provider) {
    const { uid, photoURL } = user;
    const userRef = db.collection("users").doc(uid);

    // State.sessionloggedIn = true;
    Object.assign(State.session, {
        user,
        userRef,
        uid,
        photoURL,
        authorized : true
    });

    // create user entry in db
    return userRef.get().then(doc => (
        !doc.exists ?
            userRef.set({
                    created : serverTimestamp(),
                    updated : serverTimestamp(),
                    provider,
                    photoURL
                }) :
            userRef.update({
                    updated : serverTimestamp(),
                    photoURL
                })
                .then(() => {
                    State.session.provider = doc.data().provider;

                    if (doc.data().username) {
                        State.session.username = doc.data().username;
                        State.session.loggedIn = true;
                    }
                })
    ));
}

export { checkAuth as checkAuth };
