const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    // Set the mode to development
    mode: "development",
    // Define entry points for the main JavaScript files
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    // Define output settings
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    // Define webpack plugins
    plugins: [
      // Generate HTML files with correct links to generated bundles
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Text Editor",
      }),

      // Injects our custom service worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),

      // Creates a manifest.json file.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "jate",
        short_name: "jate",
        description: "Just Another Text Editor!",
        background_color: "#225ca3",
        theme_color: "#225ca3",
        start_url: "./",
        publicPath: "./",
        icons: [
          // Array of icons for various sizes
          {
            src: path.resolve("./src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
        screenshots: [
          // Array of screenshots for the PWA
          {
            src: "assets/icons/icon_512x512.png",
            sizes: "512x512",
            type: "image/png",
            form_factor: "wide",
            label: "text editor",
          },
          {
            src: "assets/icons/icon_384x384.png",
            sizes: "384x384",
            type: "image/png",
            label: "text editor",
          },
        ],
      }),
    ],
    // Define webpack module settings
    module: {
      // Define rules for processing different file types
      rules: [
        // Rule for processing CSS files
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          // Rule for processing JavaScript files
          test: /\.m?js$/,
          exclude: /node_modules/,
          // We use babel-loader in order to use ES6.
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                // Additional plugins for Babel
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
