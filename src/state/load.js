import eol from "eol";
import hash from "string-hash";
import slugify from "slugify";

const titleSplit = "\n\n---\n\n";

const songs = [
    require("../songs/smells-like-teen-spirit.txt"),
    require("../songs/judy-is-a-punk.txt"),
    require("../songs/hatebreeders.txt")
];

export default (State) => ({
    "LOAD SONG" : (songString) => {
        const parts = eol.lf(songString).split(titleSplit);
        const song = {};

        if(parts.length > 2) {
            State.error = "loading a incorrectly formatted song";

            return;
        }

        State.songs = State.songs || [];
        State.songs.push(song);

        if(parts.length === 2) {
            song.title = parts[0];
            song.lyrics = parts[1];
        } else {
            song.untitled = true;
            song.title = `untitled ${State.songs.length}`;
            song.lyrics = parts[0];
        }

        song.slug = slugify(song.title);

        song.lyrics = song.lyrics
            .split("\n\n")
            .map((text) => ({
                hash : hash(text),
                text
            }));

        return song.slug;
    },

    "LOAD DEFAULT SONGS" : () => {
        songs.forEach((song) => {
            State.action("LOAD SONG", song);
        });
    },

    "OPEN SONG" : (idx) => {
        State.song = State.songs[idx];
    },

    "OPEN SONG BY SLUG" : (slug) => {
        let songIdx;

        State.songs.some((song, idx) => {
            if(song.slug !== slug) {
                return false;
            }

            songIdx = idx;

            return true;
        });

        if(!songIdx) {
            State.error = "song not found";
        }

        State.action("OPEN SONG", songIdx);
    },

    "CLOSE SONG" : () => {
        delete State.song;
    }
});
