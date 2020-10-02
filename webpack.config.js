const fs = require("fs");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pkg = JSON.parse(fs.readFileSync("package.json"));

const recursiveIssuer = m => {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
};

const common = {
    entry: {
        freeminance: path.resolve(__dirname, "src", "lib", "index.ts"),
        styles: path.resolve(__dirname, "src", "styles", "index.less"),
        theme: path.resolve(__dirname, "src", "styles", "theme", "index.less"),
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
                test: /\.ttf$/,
                use: "url-loader",
            },
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"],
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
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
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
                styles: {
                    name: "styles",
                    test: (m, c, entry = "main") => m.constructor.name === "CSSModule" && recursiveIssuer(m) === entry,
                    chunks: "all",
                    enforce: true,
                },
                theme: {
                    name: "theme",
                    test: (m, c, entry = "theme") => m.constructor.name === "CSSModule" && recursiveIssuer(m) === entry,
                    chunks: "all",
                    enforce: true,
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

const storybook = {
    ...development,
    module: {
        ...development.module,
        rules: development.module.rules.map((rule, i) => {
            if (i === 2) {
                return {
                    ...rule,
                    use: ["style-loader", ...rule.use.slice(1)],
                };
            } else {
                return rule;
            }
        }),
    },
};

module.exports = [
    // webpack-dev-server must be first
    { ...live, name: "live" },
    // storybook setup
    { ...storybook, name: "storybook" },
    // Regular development setups
    { ...development, name: "development" },
    { ...production, name: "production" },
];
