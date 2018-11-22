import parseLyricString from "../../lib/parseLyrics";

const slugAndIdRegex = /.+-.+/;

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

        if (this.id && this.slug) {
            this._setSlugAndId();
        }
    }

    static validateSlugAndId(slugAndId) {
        return slugAndIdRegex.test(slugAndId);
    }

    _setSlugAndId() {
        this.slugAndId = `${this.slug}-${this.id}`;
    }

    updateSnapshot(doc) {
        delete this.loading;

        this.loaded       = Date.now();
        this.doc          = doc;
        this.data         = doc.data();
        this.parsedLyrics = parseLyricString(this.data.lyrics);

        // this will never happen
        if (doc.id !== this.id) {
            this.id = doc.id;
            this._setSlugAndId();
        }

        if (this.data.slug !== this.slug) {
            this.id = doc.id;
            this._setSlugAndId();
        }

        // todo: set history here if slug changed
    }

};
