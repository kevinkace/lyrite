import { get } from "object-path";

function hideTools(State) {
    delete State.selectedColor;
}

export default (State) => ({
    CLICK_LYRIC(idx) {
        if (isNaN(State.selectedColor)) {
            // todo: switch to edit view
            return;
        }

        State.song.setColorByIdx({
            idx,
            color : State.selectedColor
        });
    },

    CLICK_COLOR(idx) {
        if (State.selectedColor !== idx) {
            State.selectedColor = idx;

            return;
        }

        delete State.selectedColor;
    },

    OPEN_TOOLS() {
        State.toolsOpen = true;
    },

    TOGGLE_TOOLS() {
        State.toolsOpen = !State.toolsOpen;

        if (!State.toolsOpen) {
            hideTools(State);
        }
    },

    CLOSE_TOOLS() {
        delete State.toolsOpen;

        hideTools(State);
    },

    INC_FONT_SIZE() {
        State.font.size += 0.1;
    },

    DEC_FONT_SIZE() {
        State.font.size -= 0.1;
    },

    SET_FONT(key) {
        console.log("set font");
    }
});
