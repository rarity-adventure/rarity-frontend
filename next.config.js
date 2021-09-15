const linguiConfig = require('./lingui.config.js')
const { locales, sourceLocale } = linguiConfig
const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')

const nextConfig = {
    webpack: (config) => {
        config.module.rules = [
            ...config.module.rules,
            {
                resourceQuery: /raw-lingui/,
                type: 'javascript/auto',
            },
        ]

        return config
    },
    pwa: {
        dest: 'public',
        runtimeCaching,
        disable: process.env.NODE_ENV === 'development',
    },
    reactStrictMode: true,
    i18n: {
        localeDetection: true,
        locales,
        defaultLocale: sourceLocale,
    },
}

module.exports = withPWA(nextConfig)
