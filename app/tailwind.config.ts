import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        app: {
          dark1: '#0D1117',
          dark2: '#1E2330',
          dark3: '#2A3146',
          dark4: '#343B50',
          accent: '#5993E2',
          text: '#EEF3FB',
          text2: '#D2D4D7',
        },
      },
    },
  },
  plugins: [],
};
export default config;
