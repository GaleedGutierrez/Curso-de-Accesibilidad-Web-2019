/* eslint-disable @typescript-eslint/no-var-requires */
import HTMLWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { Configuration } from 'webpack';

const common: Configuration = {
	target: 'web',
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].bundle.[contenthash].js',
		// assetModuleFilename: 'assets/[hash][ext][query]',
	},
	resolve: {
		extensions: ['.ts', '.js'],
		alias: {
			'@src': path.resolve(__dirname, './src/'),
			'@utils': path.resolve(__dirname, './src/utils/'),
			'@templates': path.resolve(__dirname, './src/templates/'),
			'@interface': path.resolve(__dirname, './src/interface/'),
			'@styles': path.resolve(__dirname, './styles/'),
			'@images': path.resolve(__dirname, './assets/images/'),
			'@fonts': path.resolve(__dirname, './assets/fonts/'),
		},
	},
	module: {
		rules: [
			{
				test: /\.ts$|mts/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[name][ext][query]',
				},
			},
			{
				test: /\.(png|jpg|jpeg|gif|webp|ico|svg|avif|webp|jxl)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/images/[name].[hash].[ext]',
				},
			},
			{
				test: /\.html$/,
				use: ['html-loader'],
			},
		],
	},
	plugins: [
		new HTMLWebpackPlugin({
			inject: true,
			template: 'public/index.html',
			filename: 'index.html',
		}),
	],
};

export default common;
