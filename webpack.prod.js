const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const parseStringEnvValue = (env) => {
  return env && `'${env}'`;
};

module.exports = (env = {}) => {
  return {
    mode: "production",
    entry: {
      app: "./src/index.tsx",
    },
    devServer: {
      contentBase: "./dist",
      historyApiFallback: true,
    },
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "public"),
    },
    resolve: {
      alias: {
        settingsStore: path.resolve(__dirname, "src/store/settings"),
        chatStore: path.resolve(__dirname, "src/store/chat"),
      },
      extensions: [".tsx", ".ts", ".js", ".css", ".less"],
    },
    plugins: [
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new HtmlWebpackPlugin({
        title: "Chat application",
      }),
      new webpack.DefinePlugin({
        IN_MEMORY_CHAT: env && env.IN_MEMORY_CHAT,
        SOCKET_URL: parseStringEnvValue(env.SOCKET_URL),
        ENDPOINT_URL: parseStringEnvValue(env.ENDPOINT_URL),
      }),
    ],
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
      },
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader",
        },
        {
          test: /\.((c|le)ss)$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
              },
            },
            {
              loader: "less-loader",
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ["file-loader"],
        },
      ],
    },
  };
};
