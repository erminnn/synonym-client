module.exports = {
    devServer: {
        port: '3012',
        proxy: {
            '^/api/': {
                target: 'http://localhost:3000',
                pathRewrite: { '^/api/': '/api/' },
                changeOrigin: false,
                logLevel: 'debug',
            },
        },
    },
};
