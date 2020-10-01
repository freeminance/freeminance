const fs = require("fs");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pkg = JSON.parse(fs.readFileSync("package.json"));

const common = {
    entry: {
        freeminance: path.resolve(__dirname, "src", "lib", "index.ts"),
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
            {
                test: /\.ttf/,
                use: "url-loader",
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    performance: {
        hints: false,
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

const live = {
    ...development,
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, "dist"),
        compress: true,
        port: 9000,
    },
};

module.exports = [
    // webpack-dev-server must be first
    { ...live, name: "live" },
    { ...development, name: "development" },
    { ...production, name: "production" },
];
