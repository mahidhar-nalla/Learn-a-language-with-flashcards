module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Arial', 'sans-serif'],
      },
      colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        success: '#00b894',
        danger: '#e17055',
        warning: '#f39c12',
        info: '#3498db',
      }
    },
  },
  plugins: [],
};
