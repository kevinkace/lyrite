import { get, set } from "object-path";

function DB(key) {
    if(!key) {
        throw new Error("Must provide key");
    }

    localStorage.clear();
    this.key = key;
    localStorage.setItem(key, "{}");

    //   this.parsePath = (path) => path.split(".");

    this.getData = () => {
        const data = JSON.parse(localStorage.getItem(this.key));

        return data;
    };

    this.setData = (data) => {
        return localStorage.setItem(key, JSON.stringify(data));
    };

    this.get = (path) => {
        const data = this.getData();

        return get(data, path);
    };

    this.set = (path, newData) => {
        const data = this.getData();

        set(data, path, newData);

        return this.setData(data);
    };

    this.log = () => {
        console.log(localStorage.getItem(key));
    };
}

export default DB;
