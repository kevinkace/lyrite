import { get, set } from "object-path";

export default {
    set : (path, data) => {
        const pathParts = path.split(".");

        if(pathParts.length === 1) {
            localStorage.setItem(path, data);

            return;
        }

        let top = localStorage.getItem(pathParts[0]);

        if(typeof top !== "object") {
            console.error("Lost data maybe");

            top = {};
        }

        set(top, pathParts.slice(1), data);

        localStorage.setItem(pathParts[0], top);
    }
};
