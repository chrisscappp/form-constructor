import path from "path"

export function buildBabelLoader() {
    return {
		test: /\.(ts|tsx)$/,
		//@ts-ignore
		include: path.resolve(__dirname, 'src'),
		exclude: /(node_modules|bower_components|build)/,
		use: ['babel-loader']
	}
}