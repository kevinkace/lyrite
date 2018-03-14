import eol from "eol";
import hash from "string-hash";
import slugify from "slugify";

import songs from "./songs";

const titleSplit = "\n\n---\n\n";

function parseLyricString(lyricString) {
    return lyricString
        .split("\n\n")
        .map((text) => ({
            hash : hash(text),
            text
        }));
}

function getSongParts(songString) {
    const parts = eol.lf(songString).split(titleSplit);

    return {
        title       : parts[0].split("\n")[0],
        artist      : parts[0].split("\n")[1],
        lyricString : parts[1]
    }
}

export default (State) => ({
    "LOAD SONG" : (song) => {
        let newSong = {};

        State.untitled = State.untitled || 0;
        State.songs = State.songs || [];

        if(typeof song === "object") {
            newSong = song;
        } else {
            newSong.untitled    = true;
            newSong.title       = `untitled ${++State.untitled}`;
            newSong.lyricString = song;
        }

        newSong.lyrics = parseLyricString(newSong.lyricString);
        newSong.slug = slugify(newSong.title);

        State.songs.push(newSong);

        return newSong.slug;
    },

    "SET TITLE" : (title) => {
        State.song.title = title;
        State.song.slug = slugify(State.song.title);
    },

    "ADD DEFAULT SONGS" : () => {
        songs.forEach((songString) => {
            State.action("ADD SONG", getSongParts(songString));
        });
    },

    "ADD SONG" : (songObj) => {

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
