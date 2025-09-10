/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  darkMode: ['class'],
  content: [
    './node_modules/flowbite-react/**/*.js',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        Primary: '#cbeb37',
        PrimaryDark: '#bbdb27',
        Secondary: '#39DFFF',
        SecondaryDark: '#2AB3CD',
        SecondaryDarker: '#2597ad',
        White: '#FFFFFF',
        Black: '#000000',
        DarkGray: '#363636',
        LightGray: '#919191',
        Accent: '#023859',
        Background: '#0A0A0A',
        PostButton: '#F2D4C2',
        Details: '#025E73',
      },
      textShadow: {
        sm: '-1px 1px 1px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '-4px 2px 1px var(--tw-shadow-color)',
      },
      screens: {
        xs: '320px',
        xsm: '380px',
      },
      fontFamily: {
        oswaldReg: ['OswaldReg', 'sans-serif'],
        oswaldLight: ['OswaldLight', 'sans-serif'],
        oswaldMed: ['OswaldMed', 'sans-serif'],
        oswaldSemBold: ['OswaldSemBold', 'sans-serif'],
        oswaldBold: ['OswaldBold', 'sans-serif'],
        oswaldItalic: ['OswaldBoldIt', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
    require('flowbite/plugin'),
  ],
}
