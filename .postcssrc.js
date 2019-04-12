var url = require('postcss-url')
var customProperties = require('postcss-custom-properties')

module.exports = config

function config (ctx) {
  var plugins = []

  if (ctx.env !== 'development') {
    plugins.push(
      customProperties,
      url({ filter: /\.(?:woff|svg)$/, url: 'inline', maxSize: Infinity })
    )
  }

  return { plugins }
}
