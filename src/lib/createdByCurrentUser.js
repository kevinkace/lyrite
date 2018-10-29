import state from "../state";

import { get } from "object-path";

export default function createdByCurrentUser(song) {
    const uid = get(state, [ "session", "uid" ]);
    const createdBy = get(song, [ "data", "created_by" ]) || {}; // created_by is a firebase doc ref, and not really an obj so have to handle a little differently

    return uid && createdBy.id === uid;
};
