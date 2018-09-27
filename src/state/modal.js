export default (State) => ({
    "OPEN TITLE MODAL" : () => {
        if(!State.song) {
            return;
        }

        State.modal = "title";

        m.redraw();
    },

    "OPEN LOGIN MODAL" : () => {
        // State.showLogin = true;
        State.modal = "login";
    },

    "ADD TITLE MODAL" : (title) => {
        State.action("SET TITLE", title);

        State.action("CLOSE MODAL");

        m.route.set(State.song.slug);
    },

    "CLOSE MODAL" : () => {
        delete State.modal;
        m.redraw();
    }
});
