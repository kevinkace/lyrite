import { defineConfig } from "vite";

import gitRev from "git-rev";

import { createHtmlPlugin } from "vite-plugin-html";
import mcss                 from "@modular-css/vite";
import shortnames           from "@modular-css/shortnames";
import nested               from "postcss-nested";

const ver = {};

gitRev.short((str) => {
    ver.short = str;
});

gitRev.long((str) => {
    ver.long = str;
});

gitRev.branch((str) => {
    ver.branch = str;
});

gitRev.tag((str) => {
    ver.tag = str;
});


export default defineConfig({
    plugins : [
        mcss({
            // map : {
            //     inline : false
            // },
            namer  : shortnames(),
            before : [
                nested()
            ]
        }),
        createHtmlPlugin({
            inject : {
                data : {
                    ver,
                    title : "Lyrite"
                }
            }
        })
    ],
    build : {
        sourcemap : true,
        manifest  : true
    }
});
