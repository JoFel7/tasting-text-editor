const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development", // Set the mode to development for the webpack build
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js", // Output file names will be "main.bundle.js" and "install.bundle.js"
      path: path.resolve(__dirname, "dist"), // Output directory path
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html", // Use index.html as a template for generating the HTML
      }),

      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "My PWA",
        short_name: "PWA",
        start_url: "/",
        publicPath: "./",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),

      new InjectManifest({
        swSrc: "./src-sw.js", // Path to your service worker source file
        swDest: "src-sw.js", // Destination path for the generated service worker
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"], // Use style-loader and css-loader for processing CSS files
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader", // Use babel-loader for transpiling JavaScript
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
