import { get } from "object-path";

export default (State) => ({
    "CLICK LYRIC" : (idx) => {
        const lineStyleIsSetStyle = get(State, "style.idx") === get(State, `song.lyrics.${idx}.style.idx`);

        // Deselect lyric
        // selected lyric without a style set
        if(State.selected === idx && (!State.style || lineStyleIsSetStyle)) {
            delete State.selected;

            return;
        }

        // Always set selected otherwise
        State.selected = idx;

        if(!State.style) {
            return;
        }

        // color
        State.action("COLOR SELECTED LYRIC", State.style.idx);

        return;
    },

    "CLICK STYLE" : (idx) => {
        State.style = { idx };

        // Clicking first style after opening tools
        if(!State.tooltip) {
            // create tt obj
            State.tooltip  = { style : {} };

            // add listing for tt position
            window.addEventListener("mousemove", State.events.mousemove);
        }

        // Nothing is selected so don"t color anything
        if(!State.selected && State.selected !== 0) {
            return;
        }

        // Color selected lyrics
        State.action("COLOR SELECTED LYRIC", idx);

        delete State.selected;
    },

    "COLOR SELECTED LYRIC" : (idx) => {
        State.song.lyrics[State.selected].style = { idx };
    },

    "HIDE TOOLS" : () => {
        delete State.selected;
        delete State.style;
        delete State.tooltip;

        State.action("CLOSE EDIT CURRENT SONG");

        window.removeEventListener("mousemove", State.events.mousemove);
    }
});
