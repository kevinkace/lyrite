import state from "../state";

// todo: static method in Song class
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
