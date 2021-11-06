module.exports = {
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            a: {
              color: '#3182ce',
              'text-decoration': 'none',
              '&:hover': {
                color: '#2c5282',
                'text-decoration': 'underline',
              },
            },
            code: {
              padding: '0.1rem 0.2rem',
              background: 'rgba(27, 31, 35, 0.05)',
              color: '#f47466',
              'word-wrap': 'break-word',
              'word-break': 'break-word',
              'overflow-wrap': 'break-word',
              '&::before': {
                display: 'none',
              },
              '&::after': {
                display: 'none',
              },
            },
            blockquote: {
              'font-style': 'normal',
              p: {
                '&::before': {
                  display: 'none',
                },
                '&::after': {
                  display: 'none',
                },
              },
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
