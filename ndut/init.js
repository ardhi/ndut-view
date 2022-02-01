module.exports = async function (options) {
  this.ndutView.helper.minify = require('html-minifier').minify
}