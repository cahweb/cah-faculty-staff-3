/**
 * The getters. Basically just the computed properties for the store.
 */

export const getters = {
    // Get the URL for WordPress AJAX requests
    ajaxUrl: state => state.ajaxUrl,
    // Get the current department
    dept: state => state.dept,
    // Get the WP nonce
    nonce: state => state.nonce,
    // Construct the URL for the current page
    pageUrl: () => location.protocol + '//' + location.host + location.pathname.slice(0, -1), // slice() removes the trailing slash
};