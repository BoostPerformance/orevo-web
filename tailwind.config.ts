import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
    './src/types/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
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
      backgroundImage: {
        'pro-gradient':
          'linear-gradient(156deg, #00159E 16.29%, #25ACFF 117.95%)',
      },
      colors: {
        black: {
          DEFAULT: '#131313',
          1: '#111212',
        },
        green: {
          DEFAULT: '#005E38',
        },
        blue: {
          DEFAULT: '#EBF8FF',
          1: '#0066FF',
          2: '#00BBF5',
          3: '#EDF4F8',
        },
        gray: {
          DEFAULT: '#F2F2F2',
          1: '#625C5C',
          2: '#F9F9F9',
          3: '#D9D9D9',
          4: '#A3AAAD;',
          5: '#5E5A5A',
          6: '#686868',
          7: '#9E9E9E',
          8: '#F6F6F6',
          9: '#E0E0E0',
          10: '#BDBDBD',
          11: '#A1A1A1',
          12: '#767676',
          13: '#2B2A2A',
          14: '#CACACA',
        },
        red: {
          DEFAULT: '#DD204E',
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
      lg: { min: '1025px' },
      md: { min: '768px', max: '1024px' },
      sm: { min: '480px', max: '767px' },
      xs: { min: '320px', max: '479px' },
    },
  },
  plugins: [],
};

export default config;
