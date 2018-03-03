import eol from "eol";
import hash from "string-hash";
import slugify from "slugify";

const titleSplit = "\n\n---\n\n";

const songs = [
    require("../songs/smells-like-teen-spirit.txt"),
    require("../songs/judy-is-a-punk.txt"),
    require("../songs/hatebreeders.txt"),
    require("../songs/gods-plan.txt"),
    require("../songs/perfect.txt"),
    require("../songs/finesse-remix.txt"),
    require("../songs/son-of-a-gun.txt"),
    require("../songs/sparks.txt"),
    require("../songs/black-hole-sun.txt")
];

function parseLyricString(lyricString) {
    return lyricString
        .split("\n\n")
        .map((text) => ({
            hash : hash(text),
            text
        }));
}

export default (State) => ({
    "LOAD SONG" : (songString) => {
        const song = {};
        const parts = eol.lf(songString).split(titleSplit);

        if(parts.length > 2) {
            State.error = "loading a incorrectly formatted song";

            return;
        }

        State.untitled = State.untitled || 0;
        State.songs = State.songs || [];

        State.songs.push(song);

        // has a title/author
        if(parts.length === 2) {
            song.title       = parts[0];
            song.lyricString = parts[1];

            const titleParts = song.title.split("\n");

            if(titleParts.length) {
                song.title = titleParts[0];
                song.artist = titleParts[1];
            }
        } else { // Just lyrics
            song.untitled    = true;
            song.title       = `untitled ${++State.untitled}`;
            song.lyricString = parts[0];
        }

        song.lyrics = parseLyricString(song.lyricString);
        song.slug = slugify(song.title);

        return song.slug;
    },

    "SET TITLE" : (title) => {
        State.song.title = title;
        State.song.slug = slugify(State.song.title);
    },

    "LOAD DEFAULT SONGS" : () => {
        songs.forEach((song) => {
            State.action("LOAD SONG", song);
        });
    },

    "OPEN SONG" : (idx) => {
        State.song = State.songs[idx];
    },

    "GET SONG IDX FROM SLUG" : (slug) => {
        let songIdx;

        State.songs.some((song, idx) => {
            if(song.slug !== slug) {
                return false;
            }

            songIdx = idx;

            return true;
        });

        if(!songIdx && songIdx !== 0) {
            State.error = "song not found";

            return;
        }

        return songIdx;
    },

    "CLOSE SONG" : () => {
        delete State.song;
    },

    "TOGGLE EDIT CURRENT SONG" : () => {
        return State.edit ? State.action("CLOSE EDIT CURRENT SONG") : State.action("OPEN EDIT CURRENT SONG");
    },

    "OPEN EDIT CURRENT SONG" : () => {
        State.edit = true;
    },

    "CLOSE EDIT CURRENT SONG" : () => {
        State.edit = false;
    },

    "UPDATE PARSED LYRICS" : () => {
        State.song.lyrics = parseLyricString(State.song.lyricString);
    }
});
