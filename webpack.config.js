const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/js/index.js',
        signin: './src/js/signin.js',
        signup: './src/js/signup.js',
        successful: './src/js/successful.js'
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].js",
    },
    devServer: {
        open: 'Google Chrome',
        contentBase: path.join(__dirname, "public"),
        port: 9009
    },
    module: {
        rules: [{
                test: /\.txt$/,
                use: 'raw-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS Strings
                    { loader: 'style-loader' },

                    // Translates CSS into CommonJS
                    { loader: 'css-loader' },

                    // Compiles Sass to CSS
                    { loader: 'sass-loader' }
                ]
            },
            // Start here for the URL Loader
            {
                test: /\.(png|jpg)$/,
                use: [
                    { loader: 'url-loader' }
                ]
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9]\.png|jpg)?$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader',
            }
        ]
    },
    plugins: [
        // Home Page
        new HtmlWebpackPlugin({
            title: 'Responsive Navigation',
            filename: 'index.html',
            template: './src/html-templates/index-template.html'
        }),
        new HtmlWebpackPlugin({
            title: 'OH OH',
            filename: '404.html',
            template: './src/html-templates/404-template.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Sign In',
            filename: 'signin.html',
            template: './src/html-templates/signin-template.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Signup',
            filename: 'signup.html',
            template: './src/html-templates/signup-template.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Successful',
            filename: 'successful.html',
            template: './src/html-templates/successful-template.html'
        }),
        // Favicon
        new FaviconsWebpackPlugin({
            logo: './src/images/S-FaviconBackgroundColor@4x.png'
        })
    ]
};