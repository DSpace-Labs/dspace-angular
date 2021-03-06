const {
    projectRoot,
    buildRoot,
    themedTest,
    themedUse,
    themePath,
    globalCSSImports
} = require('./helpers');
const path = require('path');

/**
 * Webpack Plugins
 */



const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (env) {
    return {
        mode: 'development',
        /**
         * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
         *
         * Do not change, leave as is or it wont work.
         * See: https://github.com/webpack/karma-webpack#source-maps
         */
        devtool: 'source-map',

        /**
         * Options affecting the resolving of modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve
         */
        resolve: {

            /**
             * An array of extensions that should be used to resolve modules.
             *
             * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
             */
            extensions: ['.ts', '.js', '.json'],

            /**
             * Make sure root is src
             */
            modules: [projectRoot('src'), 'node_modules']

        },

        /**
         * Options affecting the normal modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#module
         *
         * 'use:' revered back to 'loader:' as a temp. workaround for #1188
         * See: https://github.com/AngularClass/angular2-webpack-starter/issues/1188#issuecomment-262872034
         */
        module: {

            rules: [

                /**
                 * Source map loader support for *.js files
                 * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
                 *
                 * See: https://github.com/webpack/source-map-loader
                 */
                {
                    test: (filePath) => themedTest(filePath, 'scss'),
                    use: (info) => themedUse(info.resource, 'scss')
                },
                {
                    test: (filePath) => themedTest(filePath, 'html'),
                    use: (info) => themedUse(info.resource, 'html')
                },
                /**
                 * Typescript loader support for .ts and Angular 2 async routes via .async.ts
                 *
                 * See: https://github.com/TypeStrong/ts-loader
                 */
                {
                    test: /\.tsx?$/,
                    loaders: [{
                        loader: 'ts-loader',
                        options: {
                            configFile: projectRoot('src/tsconfig.test.json'),
                            transpileOnly: true
                        }
                    },
                        'angular2-template-loader'
                    ],
                    exclude: [/\.e2e\.ts$/]
                },

                /**
                 * CSS loader support for *.css files
                 * Returns file content as string
                 *
                 * See: https://github.com/webpack/css-loader
                 */
                {
                    test: /\.css$/,
                    use: [{
                        loader: 'to-string-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                        {
                            loader: 'css-loader',
                            options: {
                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                },

                /**
                 * SASS loader support for *.css files
                 * Returns file content as string
                 *
                 */
                {
                    test: /\.scss$/,
                    exclude: [
                        /node_modules/,
                        buildRoot('styles/_exposed_variables.scss', env),
                        buildRoot('styles/_variables.scss', env)
                    ],
                    use: [
                        {
                            loader: 'raw-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'resolve-url-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                includePaths: [projectRoot('./'), path.join(themePath, 'styles')]
                            }
                        },
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: globalCSSImports(env)
                            },
                        }
                    ]
                },
                {
                    test: /(_exposed)?_variables.scss$/,
                    exclude: [/node_modules/],
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'resolve-url-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                includePaths: [projectRoot('./'), path.join(themePath, 'styles')]
                            }
                        }
                    ]
                },

                /**
                 * Raw loader support for *.html
                 * Returns file content as string
                 *
                 * See: https://github.com/webpack/raw-loader
                 */
                {
                    test: /\.html$/,
                    loader: 'raw-loader',
                    exclude: [projectRoot('src/index.html')]
                },

                /**
                 * Instruments JS files with Istanbul for subsequent code coverage reporting.
                 * Instrument only testing sources.
                 *
                 * See: https://github.com/deepsweet/istanbul-instrumenter-loader
                 */
                {
                    enforce: 'post',
                    test: /\.(js|ts)$/,
                    loader: 'istanbul-instrumenter-loader',
                    query: {
                        esModules: true
                    },
                    include: projectRoot('src'),
                    exclude: [
                        /\.(e2e|spec)\.ts$/,
                        /node_modules/
                    ]
                }

            ]
        },

        /**
         * Add additional plugins to the compiler.
         *
         * See: http://webpack.github.io/docs/configuration.html#plugins
         */
        plugins: [

            new ContextReplacementPlugin(
                    /angular(\\|\/)core(\\|\/)@angular/,
                    projectRoot('./src'), {}
            ),
            // Workaround for https://github.com/angular/angular/issues/20357
            new ContextReplacementPlugin(
                    /\@angular(\\|\/)core(\\|\/)esm5/,
                    projectRoot('./src'), {}
            ),

            /**
             * Plugin: DefinePlugin
             * Description: Define free variables.
             * Useful for having development builds with debug logging or adding global constants.
             *
             * Environment helpers
             *
             * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
             */
            // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
            new DefinePlugin({
                'ENV': JSON.stringify(ENV),
                'HMR': false,
                'process.env': {
                    'ENV': JSON.stringify(ENV),
                    'NODE_ENV': JSON.stringify(ENV),
                    'HMR': false,
                }
            }),
            new ForkTsCheckerWebpackPlugin()
        ],

        /**
         * Disable performance hints
         *
         * See: https://github.com/a-tarasyuk/rr-boilerplate/blob/master/webpack/dev.config.babel.js#L41
         */
        performance: {
            hints: false
        },

        /**
         * Include polyfills or mocks for various node stuff
         * Description: Node configuration
         *
         * See: https://webpack.github.io/docs/configuration.html#node
         */
        node: {
            global: true,
            process: false,
            crypto: 'empty',
            module: false,
            clearImmediate: false,
            setImmediate: false
        }

    };
};
