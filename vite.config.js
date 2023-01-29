import { defineConfig } from "vite";

import mcss           from "@modular-css/vite";
import postcssNesting from "postcss-nesting";

import gitRev               from "git-rev";
import { createHtmlPlugin } from "vite-plugin-html";

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
        sourcemap : true
    }
});
