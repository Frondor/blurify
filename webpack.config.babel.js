let libraryName = 'blurify';

let entry = {'blurify': [
    './src'
]};

if (process.env.NODE_ENV === 'production') {
    entry = {'blurify.min': [
        './src'
    ]};
}

const config = {
    entry: entry,
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: '[name].js?[hash:8]',        
        library: {
          root: "Blurify",
          amd: "my-library",
          commonjs: "my-common-library"
        },
        libraryExport: 'default',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /\.(js|es6)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.es6', '.scss', '.css'],
    }
};

module.exports = config;