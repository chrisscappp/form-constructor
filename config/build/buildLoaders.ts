import webpack from "webpack"
import { BuildOptions } from "./types/config"
import { buildCssLoader } from "./loaders/buildCssLoader"
import { buildBabelLoader } from "./loaders/buildBabelLoader"
import path from "path"

const __dirname = path.resolve(path.dirname(''));

export default function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
	
	const typescriptLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	}

	const babelLoader = buildBabelLoader()

	const svgLoader = {
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	}

	const fileLoader = {
		test: /\.(png|jpe?g|gif|woff2|woff)$/i,
		use: [
			{
				loader: 'file-loader',
			},
		],
	}

	const cssLoader = buildCssLoader(isDev)
	
	return [
		fileLoader,
		svgLoader,
		babelLoader,
		typescriptLoader,
		cssLoader,
	] // порядок возврата лоудеров важен!
}