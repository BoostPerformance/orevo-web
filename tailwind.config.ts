import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      scale: {
        '175': '1.75',
        '200': '2.00',
        '220': '2.20',
        '250': '2.50',
      },
      animation: {
        marquee: 'marquee 120s linear infinite',
        marquee2: 'marquee2 120s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-60%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(-60%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      fontFamily: {
        pretendard: ['var(--pretendard)'],
        theJamsil: ['TheJamsil', 'sans-serif'],
      },
      colors: {
        black: {
          DEFAULT: '#2B2A2A',
          1: '#131313',
        },
        green: {
          DEFAULT: '#005E38',
        },
        gray: {
          DEFAULT: '#5E5A5A',
          1: '#E4E4E4',
          2: '#F9F9F9',
          3: '#625C5C',
          4: '#9E9E9E',
          5: '#686868',
        },
        beige: {
          DEFAULT: '#FFFDF8',
          1: '#FFFBF2',
        },
      },
    },
    fontSize: {
      '0.625-500': [' 0.625rem', { fontWeight: 500 }],
      '0.7-700': ['0.7rem', { fontWeight: 700 }],
      '0.75-500': ['0.75rem', { fontWeight: 500 }],
      '0.875-400': [' 0.875rem', { fontWeight: 400 }],
      '0.875-500': [' 0.875rem', { fontWeight: 500 }],
      '0.875-700': [' 0.875rem', { fontWeight: 700 }],
      '1-500': ['1rem', { fontWeight: 500 }],
      '1-600': ['1rem', { fontWeight: 600 }],
      '1-700': ['1rem', { fontWeight: 700 }],
      '1-900': ['1rem', { fontWeight: 900 }],
      '1.125-500': ['1.125rem', { fontWeight: 500 }],
      '1.125-700': ['1.125rem', { fontWeight: 700 }],
      '1.25-500': ['1.25rem', { fontWeight: 500 }],
      '1.25-700': ['1.25rem', { fontWeight: 700 }],
      '1.25-900': ['1.25rem', { fontWeight: 900 }],
      '1.5-400': ['1.5rem', { fontWeight: 400 }],
      '1.5-500': ['1.5rem', { fontWeight: 500 }],
      '1.5-700': ['1.5rem', { fontWeight: 700 }],
      '1.5-900': ['1.5rem', { fontWeight: 900 }],
      '1.6-700': ['1.6rem', { fontWeight: 700 }],
      '1.75-400': ['1.75rem', { fontWeight: 400 }],
      '1.75-500': ['1.75rem', { fontWeight: 500 }],
      '1.75-700': ['1.75rem', { fontWeight: 700 }],
      '1.75-900': ['1.75rem', { fontWeight: 900 }],
      '1.875-300': ['1.87rem', { fontWeight: 300 }],
      '1.875-400': ['1.87rem', { fontWeight: 400 }],
      '1.875-500': ['1.875rem', { fontWeight: 500 }],
      '2-600': ['2rem', { fontWeight: 600 }],
      '2-700': ['2rem', { fontWeight: 700 }],
      '2-900': ['2rem', { fontWeight: 900 }],
      '2.25-700': ['2.25rem', { fontWeight: 700 }],
      '2.5-700': ['2.5rem', { fontWeight: 700 }],
      '2.5-900': ['2.5rem', { fontWeight: 900 }],
      '3-700': ['3rem', { fontWeight: 700 }],
      '3.7-900': ['3.7rem', { fontWeight: 900 }],
      '4.25-500': ['4.25rem', { fontWeight: 500 }],
    },
    screens: {
      md: { max: '1024px' },
      sm: { max: '767px' },
    },
  },
  plugins: [],
};
export default config;
