const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'development' ,
	devtool: 'source-map' ,
	entry: { index: './src/js/index.js' } ,
	output: {
		filename: '[name].bundle.js' ,	
		path: path.resolve(__dirname, 'dist')
	} ,
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] } ,
			{ test: /\.scss$/ , use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] } ,
			{ test: /\.html$/ , use: ['html-loader'] } , 
			{ test: /\.(jpeg|png|jpg|gif)$/ , use: {loader: 'file-loader' , options: {name: '[name].[ext]' , outputPath: 'assets/images'}} },
			{ test: /\.svg$/ , use: {loader: 'file-loader' , options: {name: '[name].[ext]' , outputPath: 'assets/svg'}} },
			{ test: /\.ico$/ , use: {loader: 'file-loader' , options: {name: 'favicon.ico' , outputPath: 'assets/favicon'}} },
		]
	},
	plugins: [
		new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') }),
		new MiniCssExtractPlugin({ filename: 'style.css' }),
		new CleanWebpackPlugin(),
	],
	optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
};