export function setBaseUrl() {
    return process.env.NODE_ENV == 'production' ? 'http://www.tcxx.com' : 'https://www.easy-mock.com/mock/5c505b0ae886613e3ee52053/tc-ball-h5';
    // return process.env.NODE_ENV == 'production' ? 'http://www.tcxx.com' : '/api';
}