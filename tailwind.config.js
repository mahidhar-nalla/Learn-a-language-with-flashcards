export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Arial', 'sans-serif'],
      },
      colors: {
        primary: '#2563eb',
        secondary: '#1d4ed8',
        success: '#047857',
        danger: '#b91c1c',
        warning: '#f59e0b',
        info: '#0ea5e9',
      }
    },
  },
  plugins: [],
};
