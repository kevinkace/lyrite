import { defineConfig } from "vite";

import gitRev from "git-rev";

import { createHtmlPlugin } from "vite-plugin-html";
import mcss                 from "@modular-css/vite";
import postcssNesting       from "postcss-nesting";

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
            before : [
                postcssNesting
            ],
            include : "**/*.css"
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
        sourcemap : true
    }
});
