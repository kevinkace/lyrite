import { defineConfig } from "vite";

import mcss           from "@modular-css/vite";
import postcssNesting from "postcss-nesting";


export default defineConfig({
    plugins : [
        mcss({
            before : [
                postcssNesting
            ]
        })
    ]
});
