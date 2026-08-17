import db from "../../state/db";

import css from "./importSongs.mcss";

export default {
    view({ state }) {
        return m("div", { class : css.wrapper },
            m("button", {
                class : css.button,
                onclick() {
                    const input = document.getElementById("json-song-import");

                    if (input) {
                        input.click();
                    }
                }
            }, "import songs"),

            state.error ?
                m("p", { class : css.error },
                    "⚠️ Sorry, import failed",
                    m("br"),
                    state.error
                ) :
                null,

            m("input", {
                id : "json-song-import",
                type : "file",
                accept : ".json,application/json",
                style : "display: none",
                onchange(event) {
                    const file = event.target.files && event.target.files[0];

                    if (!file) {
                        return;
                    }

                    const reader = new FileReader();

                    reader.onload = () => {
                        try {
                            const parsed = JSON.parse(reader.result || "null");

                            Object.entries(parsed).forEach(([ slug, songObj ]) => {
                                db.set(`songs.${slug}`, songObj);
                            });

                            m.redraw();
                        } catch (err) {
                            console.error("Unable to import songs from JSON", err);
                            state.error = err.message;
                            m.redraw();
                        } finally {
                            event.target.value = "";
                        }
                    };

                    reader.readAsText(file);
                }
            })
        );
    }
}