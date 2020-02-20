/**
 * The configuration file for this Vue-CLI project. Sets build paths
 * and provides Webpack configuration that makes the project more
 * easily compatible with WordPress.
 * 
 * The biggest thing of note here is that you have to specify the
 * filenames, because Vue will go with something random and
 * unintelligible, but WordPress needs a consistent filename so that
 * it can register and load the script.
 * 
 * @author Mike W. Leavitt
 * @since 1.0.0
 */

module.exports = {
    productionSourceMap: false,
    publicPath: process.env.NODE_ENV === 'production'
        ? 'wordpress/wp-content/plugins/cah-faculty-staff-3/dist/'
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