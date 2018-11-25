const path = require("path");

const HtmlWebpackPlugin  = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const git = require("git-rev");

const CSSPlugin = require("@modular-css/webpack/plugin");
const postcssNested = require("postcss-nested");

// Bundling assets for HtmlWebpackIncludeAssetsPlugi;
const assets = [{
        path : "https://fonts.googleapis.com/css?family=Raleway|Slabo+27px|Bitter:400,700|Lato:400,700",
        type : "css"
    },
    "https://gitcdn.xyz/cdn/kevinkace/mithril.js/ae096c5f72ff69828d75cc0b3fc251132d0eac68/mithril.min.js",
    // "https://cdnjs.cloudflare.com/ajax/libs/mithril/1.1.6/mithril.js",
    "/index.css"
];

const ver = {};

git.short((str) => {
    ver.short = str;
});

git.long((str) => {
    ver.long = str;
});

git.branch((str) => {
    ver.branch = str;
});

git.tag((str) => {
    ver.tag = str;
});

module.exports = {
    entry : "./src/index.js",

    devtool : "source-map",

    devServer : {
        historyApiFallback : true,
        contentBase : "./dist"
    },

    externals : { mithril : "m" },

    mode : "development",

    module : {
        rules : [{
            test    : /\.js$/,
            exclude : /(node_modules)/,
            loader  : "babel-loader"
        }, {
            test   : /\.css$/,
            loader : "@modular-css/webpack/loader"
        }, {
            test : /\.(txt|svg)$/,
            use  : "raw-loader"
        }, {
            test   : /\.ico$/,
            loader : "file-loader?name=[name].[ext]"
        }]
    },

    plugins : [
        // Cleans build artifacts (pathsToClean, cleanOptions)
        new CleanWebpackPlugin([ "dist" ]),
        // Modular CSS
        new CSSPlugin({
            css    : "./index.css",
            map    : true,
            before : [ postcssNested ]
        }),
        // Tells webpack to use this plugin to generate the output
        new HtmlWebpackPlugin({
            title    : "Lyrite",
            template : "./src/index.ejs",
            ver
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets,        // Include assets into template
            append : false // Include after existing
        }),
        new CopyWebpackPlugin([{
            from : "./src/favicons/*",
            to   : "[name].[ext]"
        }, {
            from : "./src/404.html",
            to   : ""
        }])
    ],

    output : {
        filename : "index.js",
        path     : path.resolve(__dirname, "dist")
    }
};
