import state from "../state";

function getSongFromId(id) {
    let song;

    if (!state.songs.songs || !id) {
        return;
    }

    return state.songs.songs.some((s) => {
        song = s;

        return s.id === id;
    }) ? song : undefined;
}

export {
    getSongFromId as getSongFromId
};
