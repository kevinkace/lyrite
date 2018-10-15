import db from "../../db";

const usersCollection = db.collection("users");

let users = [];

function getUsers(vnode) {
    vnode.state.loaded = false;

    usersCollection.onSnapshot((qs) => {
        users = [];
        vnode.state.loaded = true;

        qs.forEach((doc) => {
            users.push(doc.data());
        });

        m.redraw();
    });
}

export default {
    oninit(vnode) {
        getUsers(vnode);
    },
    view(vnode) {
        return m("div", "users",
            vnode.state.loaded ?
                users.map((user) => m("div", user.name)) :
                "loading"
        );
    }
};
