import parseLyricString from "../../lib/parseLyrics";

export default class Song {
    constructor(data) {
        const validCtrParams = [
            "slugAndId",
            "slug",
            "id",
            "loading"
            // "title",
            // "artist",
            // "lyrics",

            // "doc",

            // "created",
            // "updated",

            // "fontSize",
            // "columns",
            // "colors",
        ];

        for (let key in data) {
            if (validCtrParams.indexOf(key) < 0) {
                continue;
            }

            this[key] = data[key];
        }
    }

    updateSnapshot(doc) {
        delete this.loading;

        this.loaded = Date.now();
        this.doc    = this.doc;
        this.data   = doc.data();
        this.parsedLyrics = parseLyricString(this.data.lyrics);
    }

};
