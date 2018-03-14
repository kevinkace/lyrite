import localforage from "localforage";
import { get, set } from "object-path";

export default {
    set : (path, data) => {
        const pathParts = path.split(".");

        if(pathParts.length === 1) {
            return localforage.setItem(path, data);
        }

        return localforage.getItem(pathParts[0])
            .then((top) => {
                if(!top || typeof top !== "object") {
                    console.error("Lost data maybe");

                    top = {};
                }

                set(top, pathParts.slice(1), data);

                return localforage.setItem(pathParts[0], top);
            });


    }
};
