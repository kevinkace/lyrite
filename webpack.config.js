const path = require("path");

const HtmlWebpackPlugin  = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");

const CSSPlugin = require("modular-css-webpack/plugin");

// Bundling assets for HtmlWebpackIncludeAssetsPlugi;
const assets = [{
            path : "https://fonts.googleapis.com/css?family=Raleway|Slabo+27px",
            type : "css"
        },
        "https://cdnjs.cloudflare.com/ajax/libs/mithril/1.1.6/mithril.js",
        "/index.css"
    ];

module.exports = {
    entry     : "./src/index.js",
    devtool   : "source-map",
    devServer : {
        historyApiFallback : true,
        contentBase : "./dist"
    },
    externals : { mithril : "m" },

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
            template   : "./src/index.ejs"
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
