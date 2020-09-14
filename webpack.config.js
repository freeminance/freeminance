const path = require("path");
const fs = require("fs");

const HtmlWebpackPlugin = require("html-webpack-plugin");

// Read package contents
const pkg = fs.readFileSync("package.json");

const common = {
    entry: path.resolve(__dirname, "src", "index.ts"),
    output: {
        filename: "freeminance.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "pug-loader",
                        options: {
                            pretty: true,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.pug"),
        }),
    ],
};

const development = {
    ...common,
    mode: "development",
};

const production = {
    ...common,
    mode: "production",
};

module.exports = [
    { ...development, name: "development" },
    { ...production, name: "production" },
];
