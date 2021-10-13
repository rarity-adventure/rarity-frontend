module.exports = {
    purge: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
    theme: {
        colors: {
            transparent: 'transparent',
            'background-start': '#0F2F5C',
            'background-middle': '#0F1F39',
            'background-end': '#0B1526',
            'background-contrast': '#3C415C',
            'background-contrast-dark': '#2F3C4F',
            white: '#ffffff',
            grey: '#c0c0c0',
            black: '#000000',
            contrast: '#2AE7F3',
            red: '#8F384D',
            green: '#5c8355',
            'item-background': '#2F3541',
            'red-hovered': '#830101',
            'card-top': '#2C394B',
            'card-content': '#2F3C4F',
            'card-button': '#334756',
            'card-bottom': '#3C415C',
            'market-button': '#1DFFE4',
            'market-table-top': '#1B202B',
            input: '#5C6C79',
        },
    },
    variants: {
        extend: {
            animation: ['hover, focus'],
        },
    },
    plugins: [require('tailwind-scrollbar-hide')],
}
