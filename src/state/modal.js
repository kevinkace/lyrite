import m from "mithril";

export default (State) => ({
    "OPEN TITLE MODAL" : () => {
        if(!State.song) {
            return;
        }

        State.modal = "title";

        m.redraw();
    },

    "ADD TITLE" : (title) => {
        State.action("SET TITLE", title);

        delete State.modal;

        m.route.set(State.song.slug);
    },

    "CLOSE MODAL" : () => {
        delete State.modal;
    }
});
