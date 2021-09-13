module.exports = {
    catalogs: [
        {
            path: '<rootDir>/locale/{locale}',
            include: ['<rootDir>/src'],
            exclude: ['**/node_modules/**'],
        },
    ],
    fallbackLocales: {},
    format: 'minimal',
    formatOptions: { origins: false, lineNumbers: false },
    sourceLocale: 'en',
    locales: ['en', 'es'],
    orderBy: 'messageId',
    pseudoLocale: '',
    rootDir: '.',
    runtimeConfigModule: {
        i18n: ['@lingui/core', 'i18n'],
        Trans: ['@lingui/react', 'Trans'],
    },
}