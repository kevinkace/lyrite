import { get, set } from "object-path";

// Table class, one created for each top level
function Table(key) {
    if(!key) {
        throw new Error("Must provide key");
    }

    localStorage.setItem(key, "{}");

    function _getData() {
        const data = JSON.parse(localStorage.getItem(key));

        return data;
    }

    function _setData(data) {
        return localStorage.setItem(key, JSON.stringify(data));
    }

    this.get = (path) => {
        const data = _getData();

        return get(data, path);
    };

    this.set = (path, newData) => {
        const data = _getData();

        set(data, path, newData);

        return _setData(data);
    };

    this.log = () => {
        console.log(localStorage.getItem(key));
    };
}

const db = {
    songs : new Table("songs")
};

function parsePath(path) {
    const parts = path.split(".");

    return {
        key : parts[0],
        path : parts.slice(1).join(".")
    };
}

export default {
    get : (path) => {
        const parsed = parsePath(path);

        return db[parsed.key].get(parsed.path);
    },
    set : (path, data) => {
        const parsed = parsePath(path);

        return db[parsed.key].set(parsed.path, data);
    }
};
