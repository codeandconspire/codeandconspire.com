const serve = require('serve')

const server = serve(__dirname, {
  port: process.env.PORT || 1337,
  ignore: ['node_modules']
})
