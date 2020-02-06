/**
 * The configuration file for this Vue-CLI project. Sets build paths
 * and provides Webpack configuration that makes the project more
 * easily compatible with WordPress
 * 
 * @author Mike W. Leavitt
 * @since 1.0.0
 */

module.exports = {
    productionSourceMap: false,
    publicPath: process.env.NODE_ENV === 'production'
        ? 'wordpress/wp-content/plugins/cah-faculty-staff/dist/'
        : 'http://localhost:8080/',
    outputDir: './dist',
    configureWebpack: {
        devServer: {
            contentBase: '/wp-content/plugins/cah-faculty-staff/dist/',
            allowedHosts: ['localhost/wordpress'],
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
        },
        externals: {
            jquery: 'jQuery'
        },
        output: {
            filename: 'js/cah-faculty-staff.js',
            chunkFilename: 'js/chunk_cah-faculty-staff.js',
        },
    },
    css: {
        extract: {
            filename: 'css/cah-faculty-staff.css',
            chunkFilename: 'css/chunk_cah-faculty-staff.css'
        }
    }
}