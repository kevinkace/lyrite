import { get } from "object-path";

function hideTools(State) {
    delete State.selected;
    delete State.style;
    delete State.tooltip;

    window.removeEventListener("mousemove", State.events.mousemove);
}

export default (State) => ({
    CLICK_LYRIC(idx) {
        const lineStyleIsSetStyle = get(State, "style.idx") === get(State, `song.lyrics.${idx}.style.idx`);

        // Deselect lyric
        // selected lyric without a style set
        if (State.selected === idx && (!State.style || lineStyleIsSetStyle)) {
            delete State.selected;

            return;
        }

        // Always set selected otherwise
        State.selected = idx;

        if (!State.style) {
            return;
        }

        // color
        State.action("COLOR_SELECTED_LYRIC", State.style.idx);

        return;
    },

    CLICK_STYLE(idx) {
        State.style = { idx };

        // Clicking first style after opening tools
        if (!State.tooltip) {
            // create tt obj
            State.tooltip  = { style : {} };

            // add listing for tt position
            window.addEventListener("mousemove", State.events.mousemove);
        }

        // Nothing is selected so don"t color anything
        if (!State.selected && State.selected !== 0) {
            return;
        }

        State.action("COLOR_SELECTED_LYRIC", idx);

        delete State.selected;
    },

    COLOR_SELECTED_LYRIC(idx) {
        State.song.parsedLyrics[State.selected].style = { idx };
    },

    OPEN_TOOLS() {
        State.toolsOpen = true;
    },

    TOGGLE_TOOLS() {
        State.toolsOpen = !State.toolsOpen;

        if (State.toolsOpen) {
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
        State.font.size += 0.1;
    }
});
