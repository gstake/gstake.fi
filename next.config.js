const withImages = require('next-images')
const withVideos = require('next-videos')
const {i18n} = require('./next-i18next.config')

// const localeSubpaths = {
//     en: 'en',
//     'zh-CN': 'zh-CN',
//     'zh-TW': 'zh-TW',
// }

module.exports = withVideos(
    withImages({
        rewrites: async () => [
            {
                source: '/x/api/:path*',
                destination: 'http://fttest-api2.wqrili.com/api/:path*',
            },
            {
                source: '/x/pub/:path*',
                destination: 'http://fttest-api2.wqrili.com/pub/:path*',
            },
            {source: '/iron-api/:path*', destination: '/api/:path*'},
        ],
        i18n,
        webpack: (config) => {
            return config
        },
    })
)
