const path = require('path');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = (env) => {
    const isProduction = typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'production';
    const mode = isProduction ? 'production' : 'development';
    const devtool = isProduction ? false : 'inline-source-map';

    const libPath = path.resolve(__dirname, 'libs', 'assets', 'src', 'index.ts');
    const folderName = path.basename(env.output.filename.replace('main.js', ''));

    const isBuildingLib = env.output.filename.includes('libs');
    const entryFileName = isBuildingLib
        ? libPath
        : path.resolve(__dirname, 'apps', folderName, 'src', 'main.ts');

    const outputPath = isBuildingLib
        ? path.resolve(__dirname, 'dist', 'libs')
        : path.resolve(__dirname, 'dist', 'apps', folderName);

    return {
        mode,
        devtool,
        externals: [nodeExternals()],
        entry: entryFileName,

        output: {
            path: outputPath,
            filename: "main.js",
        },

        resolve: {
            alias: {
                "@lib/assets/decorators": libPath,
                "@lib/assets/dto": libPath,
                "@lib/assets/entities": libPath,
                "@lib/assets/guards": libPath,
                "@lib/assets/modules": libPath,
                "@lib/assets": libPath,
            },
            extensions: ['.js', '.ts']
        },

        module: {
            rules: [{
                test: /.ts?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }]
        },

        plugins: [
            new Dotenv({ path: path.resolve(__dirname, 'libs', 'assets', '.env') })
        ],
    };
};