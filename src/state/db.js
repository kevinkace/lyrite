import { get, set } from "object-path";

// Table class, one created for each top level
function Table(key) {
    if(!key) {
        throw new Error("Must provide key");
    }

    // Private methods
    function _getData() {
        const data = JSON.parse(localStorage.getItem(key)) || {};

        return data;
    }

    function _setData(data) {
        return localStorage.setItem(key, JSON.stringify(data));
    }

    // init table data if needed
    if(!_getData()) {
        _setData({});
    }

    // Exposed API
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

// create Tables
const db = {
    songs : new Table("songs")
};

function parseQueryParams(queryParams) {
    if(typeof queryParams !== "string") {
        return queryParams;
    }

    return queryParams.split("&")
        .map((keyVal) => {
            const [ key, value ] = keyVal.split("=");

            return { key, value };
        });
}

// pulls first key off path
function parseQuery(query) {
    const [ keyPath, queryParams ] = query.split("?");

    const [ key, path ] = keyPath.split(".");

    return {
        key,
        path,
        query       : queryParams,
        queryParams : parseQueryParams(queryParams)
    };
}

export default {
    get : (path) => {
        const parsed = parseQuery(path);

        return db[parsed.key].get(parsed.path);
    },
    set : (path, data) => {
        const parsed = parseQuery(path);

        return db[parsed.key].set(parsed.path, data);
    }
};
