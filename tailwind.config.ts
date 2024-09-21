import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

// NOTE: keep in sync with mui theme, create common json for colors
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  important: '#root',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      primary: '#3BAE89',
      accent: '#DA2D67',
      neutral: '#F3F3F3',
      text: '#4E4E4E',
    },
  },
  plugins: [],
};
export default config;
