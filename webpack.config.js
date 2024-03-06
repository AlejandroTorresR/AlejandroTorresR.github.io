const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            filename: 'memorama.html',
            template: './src/memorama.html',
            chunks: ['exampleEntry']
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'assets', to: 'assets' },
            ]
        })
    ],
    mode: 'development',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'docs'),
        clean: true
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'docs'),
          },
        open: true
    }
};