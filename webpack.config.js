const fs = require("fs");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pkg = JSON.parse(fs.readFileSync("package.json"));

const common = {
    entry: {
            freeminance: path.resolve(__dirname, "src", "scripts", "index.ts"),
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: "ts-loader",
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
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "templates", "index.pug"),
            templateParameters: {
                version: pkg.version,
            },
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                vendor: {
                    chunks: "all",
                    test: /node_modules/,
                },
            },
        },
    },
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
