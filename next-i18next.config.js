const path = require('path')

module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'zh-HK', 'zh-CN'],
    },
    localeSubpaths: {
        en: 'en',
        'zh-CN': 'zh-CN',
        'zh-HK': 'zh-HK',
        // 'ko-KR': 'ko-KR',
    },
    localePath: path.resolve('./locales'),
    // localeDetection: false,
}
