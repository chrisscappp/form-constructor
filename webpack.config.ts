import webpack from "webpack"
import path from "path"
import { buildWebpackConfig } from "./config/build/buildWebpackConfig"
import { BuildEnv, BuildPaths } from "./config/build/types/config"

export default (env: BuildEnv) => {

	const buildPaths: BuildPaths = {
		entry: path.resolve(__dirname, "src", "index.tsx"),
		build: path.resolve(__dirname, "build"),
		html: path.resolve(__dirname, "public", "index.html"),
		src: path.resolve(__dirname, "src"),
		public: process.env.ASSET_PATH || "/"
	}

	const mode = env.mode || "development"
	const isDev = mode === "development" ? true : false
	const PORT = env.port || 3000
	const apiURL = env.apiUrl || "https://chrisscappp-form-constructor-backend-cab8.twc1.net"

	const config: webpack.Configuration = buildWebpackConfig({
		mode: mode,
		paths: buildPaths,
		isDev: isDev,
		port: PORT,
		apiURL
	})
	
	return config
}