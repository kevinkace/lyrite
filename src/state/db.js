import { get, set } from "object-path";

function DB(key) {
    if(!key) {
        throw new Error("Must provide key");
    }

    localStorage.clear();
    this.key = key;
    localStorage.setItem(key, "{}");

    //   this.parsePath = (path) => path.split(".");

    const _getData = () => {
        const data = JSON.parse(localStorage.getItem(this.key));

        return data;
    };

    const _setData = (data) => {
        return localStorage.setItem(key, JSON.stringify(data));
    };

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

const dbs = {
    songs : new DB("songs")
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

        return dbs[parsed.key].get(parsed.path);
    },
    set : (path, data) => {
        const parsed = parsePath(path);

        return dbs[parsed.key].set(parsed.path, data);
    }
};
