module.exports = (ctx) => ({
  plugins: [
    require('postcss-import')(),
    require('postcss-flexbugs-fixes')(),
    require('autoprefixer')({browsers: [ 'last 2 versions', 'ie >= 9', 'Firefox ESR' ]})
  ]
})
