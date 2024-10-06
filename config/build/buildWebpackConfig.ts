import { BuildOptions } from "./types/config"
import webpack from "webpack"
import buildPlugins from "./buildPlugins"
import buildLoaders from "./buildLoaders"
import buildResolvers from "./buildResolvers"
import { buildDevServer } from "./buildDevServer"

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
	const { mode, paths, isDev } = options 
	
	return {
		mode: mode,
		entry: paths.entry,
		module: {
			rules: buildLoaders(options)
		},
		resolve: buildResolvers(options),
		output: {
			filename: "[name].[contenthash].js",
			path: paths.build,
			clean: true,
			publicPath: paths.public
		},
		plugins: buildPlugins(options), // плагины для работы вебпак
		devtool: isDev ? "inline-source-map" : undefined,
		//@ts-ignore
		devServer: buildDevServer(options)
	}
}