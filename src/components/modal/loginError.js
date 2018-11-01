export default {
    close : true,
    view() {
        return m("div",
            m("p", "Sorry, there was an error logging in."),
            m("p",
                "Please try again, or ",
                m("a", { href : "https://github.com/kevinkace/lyrite/issues/new" },
                    "file an issue"
                )
            )
        );
    }
};
