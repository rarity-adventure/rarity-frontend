module.exports = {
    catalogs: [
        {
            path: '<rootDir>/locale/{locale}',
            include: ['<rootDir>/components', '<rootDir>/pages'],
            exclude: ['**/node_modules/**'],
        },
    ],
    fallbackLocales: {},
    format: 'minimal',
    formatOptions: { origins: false, lineNumbers: false },
    sourceLocale: 'en',
    locales: ['en', 'zh_TW'],
    orderBy: 'messageId',
    pseudoLocale: '',
    rootDir: '.',
    runtimeConfigModule: {
        i18n: ['@lingui/core', 'i18n'],
        Trans: ['@lingui/react', 'Trans'],
    },
}
