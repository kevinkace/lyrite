export default (State) => ({
    OPEN_TITLE_MODAL() {
        if (!State.song) {
            return;
        }

        State.modal = "title";
    },

    OPEN_LOGIN_MODAL() {
        // State.showLogin = true;
        State.modal = "login";
    },

    ADD_TITLE_MODAL(title) {
        State.action("SET_TITLE", title);

        State.action("CLOSE_MODAL");

        m.route.set(State.song.slug);
    },

    CLOSE_MODAL() {
        delete State.modal;
    }
});
