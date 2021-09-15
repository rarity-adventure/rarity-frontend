const linguiConfig = require('./lingui.config.js')
const { locales, sourceLocale } = linguiConfig
const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

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

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withPWA(withBundleAnalyzer(nextConfig))
