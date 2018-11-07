import state from "../state";

import { get } from "object-path";

export default function createdByCurrentUser(song) {
    const uid = get(state, [ "session", "uid" ]);
    const owner = get(song, [ "data", "owner" ]) || {}; // owner is a firebase doc ref, and not really an obj so have to handle a little differently

    return uid && owner.id === uid;
};
