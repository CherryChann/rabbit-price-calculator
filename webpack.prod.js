 const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack')
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

    module.exports = merge(common, {
        mode: 'production',
        // optimization: {
        //     minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
            
        // },
        
        optimization: {
            splitChunks: {
                chunks: 'async',
                minSize: 30000,
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 6,
                maxInitialRequests: 4,
                automaticNameDelimiter: '~',
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            })
        ],
        module: {
            
            rules: [{
                
                    test: /\.s?[ac]ss$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    url: false,
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ],
                
            }]
        },
        resolve: {
            modules: ['node_modules', 'src'],
            alias: {
                'react-date-picker': path.join(__dirname, '../node_modules/react-datepicker/dist/react-datepicker.css')
            }
        }
  });