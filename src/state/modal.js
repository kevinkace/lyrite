import m from "mithril";

export default (State) => ({
    "OPEN TITLE MODAL" : () => {
        if(!State.song) {
            return;
        }

        State.modal = { title : true };

        m.redraw();
    },

    "CLOSE MODAL" : () => {
        delete State.modal;
    }
});
