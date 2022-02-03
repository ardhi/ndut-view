const retrieveThemes = require('../lib/retrieve-themes')

module.exports = async function (options) {
  this.ndutView.helper.minify = require('html-minifier').minify
  this.ndutView.themes = await retrieveThemes.call(this, options)
}
