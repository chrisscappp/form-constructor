import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BuildOptions } from "./types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

export default function buildPlugins({paths, isDev, apiURL}: BuildOptions): webpack.WebpackPluginInstance[] {

	const plugins = [
		new HtmlWebpackPlugin({
			template: paths.html
		}),
		new webpack.ProgressPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css'
		}),
		new webpack.DefinePlugin({
			__IS_DEV__: JSON.stringify(isDev),
			__API__: JSON.stringify(apiURL)
		}),
	]

	if (isDev) {
		plugins.push(new BundleAnalyzerPlugin({
			openAnalyzer: false
		}))
	}

	return plugins
}