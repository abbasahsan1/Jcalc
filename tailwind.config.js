/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Desi Fusion Color Palette
        primary: {
          50: '#f0f9f4',
          100: '#dcf2e5', 
          200: '#bce5cd',
          300: '#8dd0ab',
          400: '#56b482',
          500: '#1C6E4A', // Mehndi Green - Primary Accent
          600: '#165d40',
          700: '#124d35',
          800: '#0f3d2b',
          900: '#0d3223',
        },
        secondary: {
          50: '#fdf2f2',
          100: '#fce7e7',
          200: '#f9d3d3',
          300: '#f4b1b1',
          400: '#ed8585',
          500: '#e35656',
          600: '#cf3030',
          700: '#ad1f1f',
          800: '#800000', // Deep Maroon - Secondary Accent
          900: '#5c0000',
        },
        gold: {
          50: '#fefbf2',
          100: '#fdf5e0',
          200: '#fbe9b8',
          300: '#f8d885',
          400: '#f4c04f',
          500: '#C9A54B', // Gold - Buttons/Highlights
          600: '#b8873d',
          700: '#9a6b32',
          800: '#7d532b',
          900: '#664427',
        },
        coral: {
          50: '#fef7f4',
          100: '#fdeee7',
          200: '#fadad1',
          300: '#f5bfb0',
          400: '#ed9c85',
          500: '#F17E5D', // Coral - Highlights
          600: '#e25d3a',
          700: '#c84928',
          800: '#a33b20',
          900: '#84321e',
        },
        cream: {
          50: '#fefefe',
          100: '#fdfcfa',
          200: '#FAF4EF', // Warm Cream - Background Light
          300: '#f6ede3',
          400: '#f0e2d1',
          500: '#e8d4bb',
          600: '#dbc1a0',
          700: '#c9a680',
          800: '#b08763',
          900: '#8f6f4f',
        },
        midnight: {
          50: '#f4f6f8',
          100: '#e9ecf1',
          200: '#d7dde6',
          300: '#bcc5d4',
          400: '#9ba7bf',
          500: '#808dab',
          600: '#6b7598',
          700: '#5c6384',
          800: '#4e546e',
          900: '#1C2230', // Midnight Blue - Background Dark
        },
        charcoal: '#2E2E2E', // Typography Base
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          600: '#059669',
          700: '#047857',
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          600: '#9333ea',
          700: '#7c3aed',
        },
        amber: {
          50: '#fffbeb',
          200: '#fde68a',
          700: '#b45309',
          800: '#92400e',
        },
        red: {
          50: '#fef2f2',
          200: '#fecaca',
          700: '#b91c1c',
          800: '#991b1b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        urdu: ['Noto Nastaliq Urdu', 'serif'],
        wedding: ['serif'], // For decorative headings
      },
      backgroundImage: {
        'mehndi-pattern': "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"60\" height=\"60\" viewBox=\"0 0 60 60\"><defs><pattern id=\"mehndi\" x=\"0\" y=\"0\" width=\"30\" height=\"30\" patternUnits=\"userSpaceOnUse\"><circle cx=\"15\" cy=\"15\" r=\"2\" fill=\"%23C9A54B\" opacity=\"0.1\"/></pattern></defs><rect width=\"100%\" height=\"100%\" fill=\"url(%23mehndi)\"/></svg>')",
        'truck-art': "linear-gradient(135deg, #1C6E4A 0%, #C9A54B 25%, #F17E5D 50%, #800000 75%, #1C6E4A 100%)",
      },
      animation: {
        'bounce-gentle': 'bounce 2s infinite',
        'shimmer': 'shimmer 2s infinite',
        'slide-in': 'slideIn 0.5s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
