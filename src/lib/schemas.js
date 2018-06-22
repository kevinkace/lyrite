const songSchema = {
    title : {
        type      : "string",
        minLength : 3
    },
    artist : {
        type      : "string",
        minLength : 3
    },
    lyrics : {
        type      : "string",
        minLength : 10
    }
};

export { songSchema as songSchema };
