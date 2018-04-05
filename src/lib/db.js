import { get, set } from "object-path";

// Table class, one created for each top level
function Table(key) {
    if(!key) {
        throw new Error("Must provide key");
    }

    const data = _getTable();

    if(data.ver && data.ver !== ver) { // eslint-disable-line no-undef

    }

    // Private methods
    function _getTable() {
        const data = JSON.parse(localStorage.getItem(key)) || {};

        return data;
    }

    function _setTable(data) {
        return localStorage.setItem(key, JSON.stringify(data));
    }

    // init table data if needed
    if(!_getTable()) {
        _setTable({});
    }

    // Exposed API
    this.get = (path) => {
        const data = _getTable();

        return get(data, path);
    };

    this.set = (path, newData) => {
        const data = _getTable();

        set(data, path, newData);

        return _setTable(data);
    };

    this.del = (path) => {
        const data = _getTable();

        if(!path) {
            return;
        }

        delete data[path];

        return _setTable(data);
    };

    this.log = () => {
        console.log(localStorage.getItem(key));
    };
}

function parseQueryParams(queryParams) {
    if(typeof queryParams !== "string") {
        return queryParams;
    }

    return queryParams.split("&")
        .reduce((acc, keyVal) => {
            let [ key, value ] = keyVal.split("=");

            // value is implicit true (for a query like post?untitied)
            if(!value) {
                value = true;
            } else {
                // parse "true", "false"
                value = parseValue(value);
            }

            acc[key] = value;

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
        filtered = filtered.filter((slug) => {
            // special case, eg songs?untitled=undefined
            if(queryParams[queryKey] === "undefined") {
                return data[slug][queryKey] === undefined;
            }

            return data[slug][queryKey] === queryParams[queryKey];
        });
    });

    return filtered.reduce((acc, cur) => {
        acc[cur] = data[cur];

        return acc;
    }, {});
}

function parseValue(value) {
    if(value === "true") {
        value = true;
    } else if(value === "false") {
        value = false;
    }
    // todo: int, float

    return value;
}

// create Tables
const db = {
    timestamp : Date.now(),
    tables    : {
        songs : new Table("songs")
    }
};

export default {
    timestamp : () => db.timestamp,

    get : (query) => {
        const parsed = parseQuery(query);

        if(!parsed.key) {
            return;
        }

        const data = db.tables[parsed.key].get(parsed.path);

        if(!parsed.queryParams) {
            return data;
        }

        return applyQueryParams(data, parsed.queryParams);
    },
    set : (query, data) => {
        const parsed = parseQuery(query);

        if(!parsed.key) {
            return;
        }

        db.timestamp = Date.now();

        return db.tables[parsed.key].set(parsed.path, data);
    },
    del : (query) => {
        const parsed = parseQuery(query);

        if(!parsed.key) {
            return;
        }

        db.timestamp = Date.now();
        return db.tables[parsed.key].del(parsed.path);
    },
    clear : () => {
        localStorage.clear();
    }
};
