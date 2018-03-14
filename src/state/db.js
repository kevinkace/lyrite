import localforage from "localforage";
import { get, set } from "object-path";

const key = "store";

export default {
    set : (path, data) =>
        localforage.getItem(key)
            .then((store) => {
                store = store || {};

                set(store, path, data);

                return localforage.setItem(key, store);
            })
};
