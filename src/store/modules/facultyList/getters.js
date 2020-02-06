export const getters = {
    ajaxUrl: state => state.ajaxUrl,
    dept: state => state.dept,
    nonce: state => state.nonce,
    pageUrl: () => location.protocol + '//' + location.host + location.pathname.slice(0, -1), // slice() removes the trailing slash
};