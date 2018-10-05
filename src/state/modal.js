export default (State) => ({
    OPEN_LOGIN_MODAL() {
        // State.showLogin = true;
        State.modal = "login";
    },

    CLOSE_MODAL() {
        delete State.modal;
    }
});
