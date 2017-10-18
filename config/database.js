if (process.env.NODE_ENV === 'production') {
    module.exports = {mongoUri: 'mongodb://mrkokoc:cocacola@ds123695.mlab.com:23695/vidjot-prod'};
} else {
    module.exports = {mongoUri: 'mongodb://localhost/vidjot-dev'};
}