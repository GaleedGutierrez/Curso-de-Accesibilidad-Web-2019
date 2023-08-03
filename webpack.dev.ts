import 'webpack-dev-server';

import path from 'path';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';

import common from './webpack.common';

const config: Configuration = {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		static: [
			path.join(__dirname, 'build'),
			{
				directory: path.join(__dirname, 'assets/'),
				publicPath: '/assets',
			},
		],
		compress: true,
		port: 8080,
		historyApiFallback: true,
		// devMiddleware      : {
		// 	writeToDisk : true
		// },
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
};

export default merge(common, config);
