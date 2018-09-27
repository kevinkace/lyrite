import { firebase } from "./";

function checkAuth(State, result) {
    if(firebase.auth().currentUser) {
        State.loggedIn = true;
        State.user = firebase.auth().currentUser;
    }

    if(result) {
        State.session = {
            token : result.credential.accessToken,
            secret : result.credential.secret
        };
    }

    m.redraw();
}

export { checkAuth as checkAuth };
