const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
	mode: "development",
	entry: {
		app: './src/index.tsx',
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'public'),
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js', '.css','.less'],
	},
	plugins: [
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
		new HtmlWebpackPlugin({
			title: 'Chat application',
		})
	],
	optimization: {
		runtimeChunk: "single",
		splitChunks: {
			chunks: "all"
		}
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},
			{
				test: /\.(less|css)$/,
				use: [

					'style-loader',
					'css-loader',
					'less-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			}
		]
	}
};