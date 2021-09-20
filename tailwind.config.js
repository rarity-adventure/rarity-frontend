module.exports = {
    purge: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
    theme: {
        fontSize: {
            xs: [
                '1.1rem',
                {
                    letterSpacing: '0.05rem',
                    lineHeight: '1',
                },
            ],
            sm: [
                '1.225rem',
                {
                    letterSpacing: '0.05rem',
                    lineHeight: '1',
                },
            ],
            base: [
                [
                    '1.35rem',
                    {
                        letterSpacing: '0.05rem',
                        lineHeight: '1',
                    },
                ],
            ],
            lg: [
                '1.475rem',
                {
                    letterSpacing: '0.05rem',
                    lineHeight: '1',
                },
            ],
            xl: [
                '1.6rem',
                {
                    letterSpacing: '0.1rem',
                    lineHeight: '1',
                },
            ],
            '2xl': [
                '1.85rem',
                {
                    letterSpacing: '0.05rem',
                    lineHeight: '1',
                },
            ],
            '3xl': [
                '2.225rem',
                {
                    letterSpacing: '0.05rem',
                    lineHeight: '1',
                },
            ],
            '4xl': [
                '2.6rem',
                {
                    letterSpacing: '0.05rem',
                    lineHeight: '1',
                },
            ],
            '5xl': [
                '3.35rem',
                {
                    letterSpacing: '0.1rem',
                    lineHeight: '1',
                },
            ],
            '6xl': [
                '4.1rem',
                {
                    letterSpacing: '0.05rem',
                    lineHeight: '1',
                },
            ],
            '7xl': [
                '4.85rem',
                {
                    letterSpacing: '0.05rem',
                    lineHeight: '1',
                },
            ],
            '8xl': [
                '6.35rem',
                {
                    letterSpacing: '0.05rem',
                    lineHeight: '1',
                },
            ],
            '9xl': [
                '8.35rem',
                {
                    letterSpacing: '0.05rem',
                    lineHeight: '1',
                },
            ],
        },
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
            'red-hovered': '#830101',
            'card-top': '#2C394B',
            'card-content': '#2F3C4F',
            'card-button': '#334756',
            'card-bottom': '#3C415C',
        },
    },
    variants: {
        extend: {
            animation: ['hover, focus'],
        },
    },
}
