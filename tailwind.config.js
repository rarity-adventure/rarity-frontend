module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            custom: {
                background: '#000000',
                blue: '#0A1931',
                green: '#007580',
                selected: '#004046',
                border: '#D8EBE4',
                red: '#c70000',
            },
            white: '#ffffff',
        },
    },
}
