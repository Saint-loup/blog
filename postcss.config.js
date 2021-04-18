require('dotenv').config()

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-nested'),

    ...process.env.NODE_ENV === "production" ? [require('cssnano')] : []
  ]
};
