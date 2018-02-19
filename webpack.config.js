const path = require("path"),

    HtmlWebpackPlugin  = require("html-webpack-plugin"),
    CleanWebpackPlugin = require("clean-webpack-plugin"),
    HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin"),
    template = require("html-webpack-template"),

    CSSPlugin = require("modular-css-webpack/plugin"),

    // Bundling assets for HtmlWebpackIncludeAssetsPlugin
    assets = [{
            path : "https://fonts.googleapis.com/css?family=Raleway|Slabo+27px",
            type : "css"
        },"https://cdnjs.cloudflare.com/ajax/libs/mithril/1.1.6/mithril.js",
        "/index.css"
    ];

module.exports = {
    entry     : "./src/index.js",
    devtool   : "inline-source-map",
    devServer : {
        contentBase : "./dist"
    },

    externals : {
        m : "mithril"
    },

    module : {
        rules : [{
            test    : /\.js$/,
            exclude : /(node_modules)/,
            loader  : "babel-loader"
        }, {
            test   : /\.css$/,
            loader : "modular-css-webpack/loader"
        }, {
            test   : /\.(svg)$/,
            loader : "file-loader"
        }, {
            test   : /\.txt$/,
            use: "raw-loader"
        }]
    },
    plugins : [
        // Cleans build artifacts (pathsToClean, cleanOptions)
        new CleanWebpackPlugin([ "dist" ]),
        // Modular CSS
        new CSSPlugin({ css : "./index.css" }),
        // Tells webpack to use this plugin to generate the output
        new HtmlWebpackPlugin({
            title      : "Lyrite",
            // template,
            // inject     : false,   // auto-injects already
            appMountId : "mount", // creates div#mount for Mithril mount point
            mobile     : true,    // adds viewport scaling
            minify     : {        // Remove some of the insane amount of whitespace
                preserveLineBreaks : true,
                collapseWhitespace : true
            }
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets,       // Include assets into template
            append : false // Include after existing
        })
    ],
    // Bundled JS
    output : {
        filename : "index.js",
        path     : path.resolve(__dirname, "dist")
    }
};
