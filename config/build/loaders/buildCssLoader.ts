import MiniCssExtractPlugin from "mini-css-extract-plugin"

export function buildCssLoader(isDev: boolean) {
	return {
		test: /\.s[ac]ss$/i,
		use: [
			isDev ? "style-loader" : MiniCssExtractPlugin.loader, // создает стили из js (style-loader)
			{
				loader: "css-loader",
				options: {
					modules: {
						auto: (resPath: string) => Boolean(resPath.includes(".module.")),
						localIdentName: 
						isDev ? 
							"[path][name]__[local]--[hash:base64:5]" 
							: "[hash:base64:8]"
					},
				}
			}, // переводит css к commonjs
			"sass-loader", // переводит sass к css
		],
	}
}