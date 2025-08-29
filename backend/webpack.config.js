const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');

module.exports = {
    context: path.resolve(__dirname, 'libs/assets'),
    entry: './src/index.ts',
    target: 'node',
    mode: 'development',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new Dotenv({ path: '.env' }),
    ],
};