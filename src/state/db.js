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
        .reduce((acc, keyVal) => {
            const [ key, value ] = keyVal.split("=");

            acc[key] = value || true;

            return acc;
        }, {});
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

function applyQueryParams(data, queryParams) {
    let filtered = Object.keys(data);

    Object.keys(queryParams).forEach((queryKey) => {
        filtered = filtered.filter((slug) => data[slug][queryKey] === queryParams[queryKey]);
    });

    return filtered.reduce((acc, cur) => {
        acc[cur] = data[cur];

        return acc;
    }, {});
}

export default {
    get : (query) => {
        const parsed = parseQuery(query);
        const data = db[parsed.key].get(parsed.path);

        if(!parsed.queryParams) {
            return data;
        }

        return applyQueryParams(data, parsed.queryParams);
    },
    set : (query, data) => {
        const parsed = parseQuery(query);

        return db[parsed.key].set(parsed.path, data);
    },
    clear : () => {
        localStorage.clear();
    }
};
