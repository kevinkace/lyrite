import db, { firebase, fsTimestamp } from "./";

/**
 * Does something with auth
 * @param {object} State - state object...?
 * @param {object} [result] - provider auth result
 * @param {object} [user] - user data
 */
function checkAuth(State, result, user) {
    if (firebase.auth().currentUser) {
        State.loggedIn = true;
        State.user = firebase.auth().currentUser;
    }

    if (result) {
        const { accessToken, secret } = result.credential;
        const { uid, email, photoURL } = result.user;
        const ref = db.collection("users").doc(uid);

        // what's this for? who knows!
        State.session = {
            accessToken,
            secret
        };

        // create user entry in db
        ref.get().then(doc => {
            if (!doc.exists) {
                return ref.set({
                    created_at : fsTimestamp(),
                    email,
                    photoURL
                });
            }

            return ref.update({
                created_at : fsTimestamp(),
                email,
                photoURL
            });
        });
    }

    if (user) {
        console.log("user");
    }

    m.redraw();
}

export { checkAuth as checkAuth };
