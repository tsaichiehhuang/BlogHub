/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react')

module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            minHeight: {
                56: '14rem',
            },
        },
    },
    darkMode: 'class',
    plugins: [
        require('@tailwindcss/typography'),
        nextui({
            prefix: 'nextui',
            addCommonColors: false,
            defaultTheme: 'light',
            defaultExtendTheme: 'light',
            layout: {},
            themes: {
                light: {
                    layout: {},
                    colors: {
                        background: '#FDFDFD',
                        foreground: '#11181C',
                        primary: {
                            foreground: '#FFFFFF',
                            DEFAULT: '#078BF0',
                        },
                        success: '#7FE69C',
                        bordered: '#333',
                        warning: { DEFAULT: '#F2A660', foreground: '#000000' },
                    },
                },
                dark: {
                    layout: {},
                    colors: {
                        background: '#171E28',
                        foreground: '#ECEDEE',
                        primary: {
                            foreground: '#FFFFFF',
                            DEFAULT: '#6689CB',
                        },
                    },
                },
            },
        }),
    ],
}
